'use strict';

// Trying to pick apart the examples on webgpu.io
// The pipeline approach requires you to know everything about your rendering process upfront so will make it harder to experiment possibly.

window.addEventListener('load', init);

var _ctx;

// what are the common types of uniform buffer??
// model, view, proj, view_proj, mvp
// what about fragment uniforms??
function Uniform_Buffer()
{
	const uniformBuffer = device.createBuffer(
	{
        size: uniformBufferSize,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.TRANSFER_DST,
    });
}

function Vertex_Buffer(data, usage)
{
	var r = _ctx.device.createBuffer(
	{
		size: data.byteLength,
		usage: usage,
	});

	r.setSubData(0, data);
	return r;
}

function Mesh()
{
	var r = {};
	r.attributes;
	r.vertex_buffer;
	r.index_buffer;
	return; r;
}

function Shader(vertex_src, fragment_src)
{
	var r = {};
	r.vertex_src = vertex_src;
	r.fragment_src = fragment_src;
	r.vertex_module;
	r.fragment_module;
	return r;
}

function bind_shader(shader)
{

}

function Mipmap(width, height, data)
{
	var r = {};
	r.width = width;
	r.height = height;
	r.data = data;
	return r;
}

function Sampler(down, up)
{
	return _ctx.device.createSampler(
	{
        magFilter: up,
        minFilter: down,
        //more options??
    });
}

function Texture()
{
	var r = {};
	r.id;
	r.width;
	r.height;
	r.depth;
	r.format;
	r.data;
    r.num_mipmaps;
	return r;
}

function bind_texture(t)
{
	var usage = ;
	var format = "";
	var dimension = "2d";
	//if(t.format is whatever) dimension = "3d";

    t.id = _ctx.device.createTexture(
    {
	    size: {width: t.width, height: t.height, depth: t.depth},
	    arrayLayerCount: 1, //dunno
	    mipLevelCount: t.num_mipmaps,
	    sampleCount: 1,
	    dimension: dimension,
	    format: format,
	    usage: usage
	});
}

function pipeline(shader)
{
    var pipelineLayout = device.createPipelineLayout({ bindGroupLayouts: [uniformsBindGroupLayout] });
    
    var pipeline = device.createRenderPipeline(
    {
        layout: pipelineLayout,
        /*
        vertexStage: {
            module: device.createShaderModule({
                code: Utils.compile("v", vertexShaderGLSL),
            }),
            entryPoint: "main"
        },
        fragmentStage: {
            module: device.createShaderModule({
                code: Utils.compile("f", fragmentShaderGLSL),
            }),
            entryPoint: "main"
        },
        */

        vertexStage: 
        {
            module: shader.vertex_module, 
            entryPoint: "main"
        },
        fragmentStage: 
        {
            module: shader.fragment_module, 
            entryPoint: "main"
        },
        
        //primitiveTopology: "triangle-list",
        primitiveTopology: "triangle-list",

        depthStencilState: 
        {
            depthWriteEnabled: true,
            depthCompare: "less",
            format: "depth32float-stencil8",
            stencilFront: {},
            stencilBack: {},
        },

        // can we fetch these from the shader??
        vertexInput: {
            indexFormat: "uint32",
            vertexBuffers: [{
                stride: vertexSize,
                stepMode: "vertex",
                attributes: [{
                    // position
                    shaderLocation: 0,
                    offset: 0,
                    format: "float4"
                }, {
                    // color
                    shaderLocation: 1,
                    offset: colorOffset,
                    format: "float4"
                }]
            }],
        },
        rasterizationState: 
        {
            frontFace: 'ccw',
            cullMode: 'back',
        },
        colorStates: [{
            format: "bgra8unorm",
            alphaBlend: {},
            colorBlend: {},
        }],
    });
}

function render_pass()
{
    var renderPassDescriptor = {
        colorAttachments: [{
            loadOp: "clear",
            storeOp: "store",
            clearColor: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 }
        }],
        depthStencilAttachment: {
            attachment: depthTexture.createDefaultView(),
            depthLoadOp: "clear",
            depthStoreOp: "store",
            stencilLoadOp: "clear",
            stencilStoreOp: "store",
            clearDepth: 1.0
        }
    };
}

function uniform_group()
{
    var uniformsBindGroupLayout = device.createBindGroupLayout({
                bindings: [{
                    binding: 0,
                    visibility: 1,
                    type: "uniform-buffer"
                }]
            });
}

async function WebGPU(canvas, options)
{
	if(!navigator.gpu)
	{
		console.log('WebGPU not supported');
		return;
	}

	var r = {};
	r.adapter = await navigator.gpu.requestAdapter();
	r.device = await adapter.requestDevice({});
	r.ctx = canvas.getContext('gpupresent');

	if(!r.adapter |! r.device |! r.ctx)
	{
		console.log('WebGPU not supported');
		return;
	}

    // double, triple buffer etc
	r.swap_chain = r.ctx.configureSwapChain(
	{
		r.device, //no key?
		format: "bgra8unorm", //give these better names
    });

    r.uniform_groups = 
    {

    }

    r.render_passes = 
    {

    }

    r.pipelines = 
    {

    }

    _ctx = r;

    return r;
}

var app = {};

function init()
{
	app.canvas = ;
	app.gl = WebGPU(canvas, {});

    //bind assets    

    //build pipelines
}

function render() 
{
	var r = _ctx;

    pass_descriptor.colorAttachments[0].attachment = r.swap_chain.getCurrentTexture().createDefaultView();
    var cmd_encoder = _ctx.device.createCommandEncoder({});

    //update uniforms
    uniformBuffer.setSubData(0, mvp);

    //draw call
    var pass_encoder = cmd_encoder.beginRenderPass(pass_descriptor);
    pass_encoder.setPipeline(pipeline);
    pass_encoder.setBindGroup(0, uniformBindGroup);
    pass_encoder.setVertexBuffers(0, [mesh.vertex_buffer], [0]); //mesh.buffers??
    pass_encoder.draw(mesh.vertex_buffer.count, 1, 0, 0);
    pass_encoder.endPass();

    //Looks like we'll need one pipeline per shader so could boil it down to something like this
    //draw_pass(encoder, pass, shader, mesh);

    r.device.getQueue().submit([cmd_encoder.finish()]);
}
