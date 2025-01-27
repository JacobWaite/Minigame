const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./PaladinSheet.png");
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);
	gameEngine.addEntity(new Paladin(gameEngine,50,50, ASSET_MANAGER.getAsset("./PaladinSheet.png"), 17, 40, 16, 24, 100, 20, 10, 10));
	gameEngine.start();
});
