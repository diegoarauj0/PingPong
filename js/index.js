"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Canvas {
    constructor(sizeCanvas) {
        this.Element = document.createElement("canvas");
        let context = this.Element.getContext("2d");
        if (context == null)
            throw "";
        this.Context = context;
        this.SizeCanvas = sizeCanvas;
        this.Element.width = this.SizeCanvas.width;
        this.Element.height = this.SizeCanvas.height;
    }
    render(start, player1, player2, boll) {
        this.renderBackGround();
        if (!start) {
            this.renderStart();
            return;
        }
        this.renderCenterLine();
        this.renderPlayer(player1);
        this.renderPlayer(player2);
        this.renderPoint(player1, false);
        this.renderPoint(player2, true);
        this.renderBoll(boll);
    }
    renderBackGround() {
        this.Context.fillStyle = "#0C171D";
        this.Context.fillRect(0, 0, this.SizeCanvas.width, this.SizeCanvas.height);
    }
    renderStart() {
        this.Context.font = "20px PressStart2P";
        this.Context.textAlign = "center";
        this.Context.fillStyle = "white";
        this.Context.fillText("CLICK NA TELA PARA COMEÇAR", this.SizeCanvas.width / 2, this.SizeCanvas.height / 2);
    }
    renderCenterLine() {
        let jump = false;
        for (let c = -15; c < this.SizeCanvas.height; c += this.SizeCanvas.height / 20) {
            if (jump) {
                this.Context.fillStyle = "black";
                this.Context.fillRect(this.SizeCanvas.width / 2 - ((this.SizeCanvas.height / 20) / 2) + 5, c + 5, this.SizeCanvas.height / 20, this.SizeCanvas.height / 20);
                this.Context.fillStyle = "white";
                this.Context.fillRect(this.SizeCanvas.width / 2 - ((this.SizeCanvas.height / 20) / 2), c, this.SizeCanvas.height / 20, this.SizeCanvas.height / 20);
            }
            jump = !jump;
        }
    }
    renderPlayer(player) {
        this.Context.fillStyle = "black";
        this.Context.fillRect(player.Position.x + 5, player.Position.y + 5, player.Size.width, player.Size.height);
        this.Context.fillStyle = "white";
        this.Context.fillRect(player.Position.x, player.Position.y, player.Size.width, player.Size.height);
    }
    renderPoint(player, right) {
        this.Context.font = "50px PressStart2P";
        if (right) {
            this.Context.textAlign = "right";
            this.Context.fillStyle = "black";
            this.Context.fillText(String(player.point), this.SizeCanvas.width - 50 + 5, 100 + 5);
            this.Context.fillStyle = "white";
            this.Context.fillText(String(player.point), this.SizeCanvas.width - 50, 100);
            return;
        }
        this.Context.textAlign = "left";
        this.Context.fillStyle = "black";
        this.Context.fillText(String(player.point), 50 + 5, 100 + 5);
        this.Context.fillStyle = "white";
        this.Context.fillText(String(player.point), 50, 100);
    }
    renderBoll(boll) {
        this.Context.fillStyle = "black";
        this.Context.fillRect(boll.Position.x + 5, boll.Position.y + 5, boll.Size.width, boll.Size.height);
        this.Context.fillStyle = "white";
        this.Context.fillRect(boll.Position.x, boll.Position.y, boll.Size.width, boll.Size.height);
    }
}
class Player {
    constructor(size, position, keys, speed, sizeCanvas) {
        this.KeyDown = { up: false, down: false };
        this.point = 0;
        this.Size = size;
        this.Position = position;
        this.Keys = keys;
        this.Speed = speed;
        this.SizeCanvas = sizeCanvas;
        this.control();
    }
    control() {
        document.addEventListener("keydown", (Event) => {
            if (this.Keys.up == Event.code)
                this.KeyDown.up = true;
            if (this.Keys.down == Event.code)
                this.KeyDown.down = true;
        });
        document.addEventListener("keyup", (Event) => {
            if (this.Keys.up == Event.code)
                this.KeyDown.up = false;
            if (this.Keys.down == Event.code)
                this.KeyDown.down = false;
        });
    }
    refresh() {
        if (this.KeyDown.down == true) {
            this.Position.y += this.Speed;
        }
        if (this.KeyDown.up == true) {
            this.Position.y -= this.Speed;
        }
        if (this.Position.y < 0) {
            this.Position.y = 0;
        }
        if (this.Position.y + this.Size.height > this.SizeCanvas.height) {
            this.Position.y = this.SizeCanvas.height - this.Size.height;
        }
    }
}
class Boll {
    constructor(size, position, sizeCanvas, force) {
        this.Speed = { x: 0, y: 0 };
        this.Size = size;
        this.Position = position;
        this.SizeCanvas = sizeCanvas;
        this.Force = force;
        this.Backup = {
            x: this.Position.x,
            y: this.Position.y
        };
        this.speedRandomX();
        this.speedRandomY();
    }
    speedRandomX() {
        let random = Math.round(Math.random() * 1);
        if (this.Speed.x == 0) {
            this.Speed.x = random == 0 ? -3 : 3;
            return;
        }
        this.Speed.x = random == 0 ? this.Speed.x < 0 ? this.Speed.x : this.Speed.x - (this.Speed.x) * 2 : this.Speed.x > 0 ? this.Speed.x : Math.abs(this.Speed.x);
    }
    speedRandomY() {
        let random = Math.round(Math.random() * 1);
        if (this.Speed.y == 0) {
            this.Speed.y = random == 0 ? -1 : 1;
            return;
        }
        this.Speed.y = random == 0 ? this.Speed.y < 0 ? this.Speed.y : this.Speed.y - (this.Speed.y) * 2 : this.Speed.y > 0 ? this.Speed.y : Math.abs(this.Speed.y);
    }
    reset(speed) {
        this.Position = {
            x: this.Backup.x,
            y: this.Backup.y
        };
        this.Speed = speed;
    }
    refresh(player1, player2, sound1, sound2) {
        if (this.Position.y < 0) {
            this.Speed.y = Math.abs(this.Speed.y) + this.Force.y;
            sound2.currentTime = 0;
            sound2.play();
        }
        if (this.Position.y > this.SizeCanvas.height - this.Size.height) {
            this.Speed.y = (this.Speed.y + this.Force.y) - (this.Speed.y + this.Force.y) * 2;
            sound2.currentTime = 0;
            sound2.play();
        }
        if (this.Position.x < 0) {
            player2.point++;
            this.reset({ x: 3, y: 0 });
            this.speedRandomY();
            sound1.currentTime = 0;
            sound1.play();
        }
        if (this.Position.x + this.Size.width > this.SizeCanvas.width) {
            player1.point++;
            this.reset({ x: -3, y: 0 });
            this.speedRandomY();
            sound1.currentTime = 0;
            sound1.play();
        }
        if (this.Position.x < 0 + player1.Size.width && player1.Position.y + player1.Size.height > this.Position.y && player1.Position.y < this.Position.y + this.Size.height) {
            this.Speed.x = Math.abs(this.Speed.x) + this.Force.x;
            this.speedRandomY();
            sound2.currentTime = 0;
            sound2.play();
        }
        if (this.Position.x + this.Size.width > this.SizeCanvas.width - player2.Size.width && player2.Position.y + player2.Size.height > this.Position.y && player2.Position.y < this.Position.y + this.Size.height) {
            this.Speed.x = (this.Speed.x + this.Force.x) - (this.Speed.x + this.Force.x) * 2;
            this.speedRandomY();
            sound2.currentTime = 0;
            sound2.play();
        }
        this.Position.x += this.Speed.x;
        this.Position.y += this.Speed.y;
    }
}
class Game {
    constructor() {
        this.Load = false;
        this.Start = false;
        this.Size = { width: 800, height: 500 };
        this.Canvas = new Canvas(this.Size);
        this.Sound1 = new Audio("audio/sound1.mp3");
        this.Sound2 = new Audio("audio/sound2.mp3");
        this.Font = new FontFace("PressStart2P", "url(fonts/PressStart2P.ttf)");
        this.Player1 = new Player({ width: this.Size.height / 20, height: (this.Size.height / 20) * 3 }, { x: 0, y: (this.Size.height / 2) - ((this.Size.height / 20) * 3) / 2 }, { up: "KeyW", down: "KeyS" }, 8, this.Size);
        this.Player2 = new Player({ width: this.Size.height / 20, height: (this.Size.height / 20) * 3 }, { x: this.Size.width - (this.Size.height / 20), y: (this.Size.height / 2) - ((this.Size.height / 20) * 3) / 2 }, { up: "ArrowUp", down: "ArrowDown" }, 8, this.Size);
        this.Boll = new Boll({ width: this.Size.height / 20, height: this.Size.height / 20 }, { x: this.Size.width / 2 - (this.Size.height / 20) / 2, y: this.Size.height / 2 - (this.Size.height / 20) / 2 }, this.Size, { x: 0.5, y: 0.5 });
    }
    load(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Sound1.load();
            yield this.Sound2.load();
            document.fonts.add(yield this.Font.load());
            document.body.appendChild(this.Canvas.Element);
            this.Load = true;
            cb();
        });
    }
    start() {
        if (!this.Load || this.Start)
            return;
        this.Start = true;
    }
    refresh() {
        if (!this.Load)
            return;
        if (this.Start) {
            this.Player1.refresh();
            this.Player2.refresh();
            this.Boll.refresh(this.Player1, this.Player2, this.Sound1, this.Sound2);
        }
        this.Canvas.render(this.Start, this.Player1, this.Player2, this.Boll);
    }
}
const game = new Game();
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    yield game.load(() => {
        var _a;
        (_a = document.querySelector("div.loading")) === null || _a === void 0 ? void 0 : _a.remove();
        function loop() {
            game.refresh();
            requestAnimationFrame(loop);
        }
        loop();
        document.addEventListener("click", () => {
            game.start();
        });
    });
}), 1000);
