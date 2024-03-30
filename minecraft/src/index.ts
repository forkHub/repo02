var canvas: HTMLCanvasElement = document.getElementById("renderCanvas") as HTMLCanvasElement;

var engine: BABYLON.Engine = null;
var scene: BABYLON.Scene = null;
var sceneToRender: BABYLON.Scene = null;

var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };

var startRenderLoop = function (engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    canvas;
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

class Playground {
    static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        const camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 4, Math.PI / 4, 14, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        const light: BABYLON.HemisphericLight = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        light;

        // // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        // var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        // // Default intensity is 1. Let's dim the light a small amount
        // light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, options, scene
        //var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);
        // Move the sphere upward 1/2 its height
        //sphere.position.y = 1;

        // Our built-in 'ground' shape. Params: name, options, scene
        // var ground: BABYLON.GroundMesh = 
        BABYLON.MeshBuilder.CreateGround("ground", { width: 1, height: 1 }, scene);

        scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    if (pointerInfo && pointerInfo.pickInfo && pointerInfo.pickInfo.pickedMesh && pointerInfo.pickInfo.pickedMesh.name == "ground") {
                        Box.buat();
                    }
                    else {
                        console.log(pointerInfo.pickInfo);
                    }
                    break;
            }
        });

        scene.debugLayer.show();

        return scene;
    }
}

const createScene = function () { return Playground.CreateScene(engine, engine.getRenderingCanvas()); }

const initFunction = async function () {
    var asyncEngineCreation = async function () {
        try {
            return createDefaultEngine();
        } catch (e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);
    window.scene = createScene();
};

initFunction().then(() => {
    sceneToRender = scene
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
