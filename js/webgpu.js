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

/*
Vertex Fomat
"uchar2",
"uchar4",
"char2",
"char4",
"uchar2norm",
"uchar4norm",
"char2norm",
"char4norm",
"ushort2",
"ushort4",
"short2",
"short4",
"ushort2norm",
"ushort4norm",
"short2norm",
"short4norm",
"half2",
"half4",
"float",
"float2",
"float3",
"float4",
"uint",
"uint2",
"uint3",
"uint4",
"int",
"int2",
"int3",
"int4"
*/

/*
Index Format
"uint16",
"uint32"
*/

/*
Step Mode
"vertex",
"instance"
*/

function Vertex_Buffer(data, usage)
{
	var r = _GPU.device.createBuffer(
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

function Mipmap(width, height, data)
{
	var r = {};
	r.width = width;
	r.height = height;
	r.data = data;
	return r;
}

/*
// SAMPLERS //

Sampler tiling

"clamp-to-edge",
"repeat",
"mirror-repeat"
*/

/*
Sampler Filtering
"nearest",
"linear"
*/

function Sampler(params)
{
    return _GPU.device.createSampler(params);
}

function default_sampler()
{
    return _GPU.device.createSampler(
    {
        wrap_u: u,
        wrap_v: v,
        wrap_w: w,
        magFilter: up,
        minFilter: down,
        mipmapFilter: mipmap,
        compareFunction: compare
    });
}

/*
Texture Formats
TODO: pick out common ones an rename

"r8unorm",
"r8unorm-srgb",
"r8snorm",
"r8uint",
"r8sint",
"r16unorm",
"r16snorm",
"r16uint",
"r16sint",
"r16float",
"rg8unorm",
"rg8unorm-srgb",
"rg8snorm",
"rg8uint",
"rg8sint",
"b5g6r5unorm",
"r32uint",
"r32sint",
"r32float",
"rg16unorm",
"rg16snorm",
"rg16uint",
"rg16sint",
"rg16float",
"rgba8unorm",
"rgba8unorm-srgb",
"rgba8snorm",
"rgba8uint",
"rgba8sint",
"bgra8unorm",
"bgra8unorm-srgb",
"rgb10a2unorm",
"rg11b10float",
"rg32uint",
"rg32sint",
"rg32float",
"rgba16unorm",
"rgba16snorm",
"rgba16uint",
"rgba16sint",
"rgba16float",
"rgba32uint",
"rgba32sint",
"rgba32float",
"depth32float",
"depth32float-stencil8"
*/

/*
Texture Dimensions
"1d",
"2d",
"3d"
*/

function Texture()
{
	var r = {};
	r.id;
	r.width;
	r.height;
	r.depth;
    r.dimension;
	r.format;
	r.data;
    r.num_mipmaps;
	return r;
}

function bind_texture(t)
{
	var usage = ;

    t.id = _GPU.device.createTexture(
    {
	    size: {width: t.width, height: t.height, depth: t.depth},
	    arrayLayerCount: 1, //dunno
	    mipLevelCount: t.num_mipmaps,
	    sampleCount: 1,
	    dimension: t.dimension,
	    format: t.format,
	    usage: usage
	});
}


/*
Front Face
"ccw",
"cw"
*/

/*
Cull Mode
"none",
"front",
"back"
*/

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
    shader.vertex_module = _GPU.device.createShaderModule(compile(shader.vertex_src));
    shader.fragment_module = _GPU.device.createShaderModule(compile(shader.fragment_src));
}

/*
Topology
"point-list",
"line-list",
"line-strip",
"triangle-list",
 "triangle-strip"
*/


// could have a list of common raster type, mesh types etc??

// Raster State

default: 
{
    frontFace: 'ccw'
    cullMode = 'back';
    depthBias = 0; //i32
    depthBiasSlopeScale = 0; //f32
    depthBiasClamp = 0; //f32
};

// Depth Stencil State

default:
{
    depthWriteEnabled: true,
    depthCompare: "less",
    format: "depth32float-stencil8",
    stencilFront: {},
    stencilBack: {},
},

// Color State
/*
interface GPUColorWriteBits 
{
    const u32 NONE = 0;
    const u32 RED = 1;
    const u32 GREEN = 2;
    const u32 BLUE = 4;
    const u32 ALPHA = 8;
    const u32 ALL = 15;
};

Blend Mode
"zero",
"one",
"src-color",
"one-minus-src-color",
"src-alpha",
"one-minus-src-alpha",
"dst-color",
"one-minus-dst-color",
"dst-alpha",
"one-minus-dst-alpha",
"src-alpha-saturated",
"blend-color",
"one-minus-blend-color"

Blend Function
"add",
"subtract",
"reverse-subtract",
"min",
"max"

GPUBlendDescriptor {
    GPUBlendFactor srcFactor = "one";
    GPUBlendFactor dstFactor = "zero";
    GPUBlendOperation operation = "add";
};
*/

default, inverse, overlay etc
{
    srcFactor: "one,
    dstFactor: "zero",
    operation: "add",
}

// Blends
default:
{
    format: "bgra8unorm",
    alphaBlend: {},
    colorBlend: {},
    writeMask: GPUColorWriteBits.ALL
}




function pipeline(shader, raster, depth_stencil, blend)
{
    var layout = _GPU.device.createPipelineLayout({ bindGroupLayouts: [uniformsBindGroupLayout] });
    
    var pipeline = _GPU.device.createRenderPipeline(
    {
        layout: layout,

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

        primitiveTopology: "triangle-list",
        rasterizationState: raster,
        depthStencilState: depth_stencil,

        // can we fetch these from the shader??
        vertexInput: 
        {
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
        
        colorStates: [blend],

        sampleCount: 1, //AA

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

/*
Power Preference
"low-power",
"high-performance"
*/

async function WebGPU(canvas, options)
{
	if(!navigator.gpu)
	{
		console.log('WebGPU not supported');
		return;
	}

	var r = {};
	r.adapter = await navigator.gpu.requestAdapter(
    {
        powerPreference: "high-performance",
    }); 
	r.device = await adapter.requestDevice(
    {
        extensions: ,
        limits: ,
    }); 
	r.ctx = canvas.getContext('gpupresent');

	if(!r.adapter |! r.device |! r.ctx)
	{
		console.log('WebGPU not supported');
		return;
	}

    // double, triple buffer etc
	r.swap_chain = r.ctx.configureSwapChain(
	{
		device: r.device,
		format: "bgra8unorm", //GPUTextureFormat
        //usage: GPUTextureUsage.OUTPUT_ATTACHMENT
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
    var cmd_encoder = _GPU.device.createCommandEncoder({});

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
