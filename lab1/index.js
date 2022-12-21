class Drawer {
    constructor(canvas, inputs) {
        this.inputs = inputs;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.initCanvas();
    }

    initCanvas() {
        this.ctx.fillStyle = "black";
        this.ctx.setTransform(1,0,0,-1,0,canvas.height);
    }

    start() {
        this.clear();
        const args = this.inputs.map(input => Number(input.value));

        this.draw(...args);
    }

    draw() {
        console.log(arguments);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line([x0, y0], [x1, y1]) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    rotateX({ radians, pivot, point }) {
        const [ x0, y0 ] = pivot;
        const [ x, y ] = point;

        return (x - x0) * Math.cos(radians) - (y - y0) * Math.sin(radians) + x0;
    }

    rotateY({ radians, pivot, point }) {
        const [ x0, y0 ] = pivot;
        const [ x, y ] = point;

        return (x - x0) * Math.sin(radians) + (y - y0) * Math.cos(radians) + y0;
    }

    rotatePoint({ radians, pivot, point }) {
        return [
            this.rotateX({ radians, pivot, point }),
            this.rotateY({ radians, pivot, point }),
        ];
    }
}

class Pifagor extends Drawer {
    draw() {
        this.pifagor(...arguments);
    }

    pifagor(n, x0, y0, a, fi, alpha) {
        if (n <= 0) {
            return;
        }

        const antiAlpha = 90 - alpha;

        const fiRadians = fi * Math.PI / 180;
        const alphaRadians = alpha * Math.PI / 180;

        const pivot = [ x0, y0 ];

        const points = {
            A: [ x0, y0 ],
            B: [ x0, y0 + a ],
            C: [ x0 + a, y0 + a ],
            D: [ x0 + a, y0 ],
        };

        const leftLeg = Math.cos(alphaRadians) * a;
        const rightLeg = Math.sin(alphaRadians) * a;

        console.log(leftLeg);
        console.log(rightLeg)

        points.E = this.rotatePoint({ 
                radians: alphaRadians,
                pivot: points.B,
                point: [ points.B[0] + leftLeg, points.B[1] ]
        });

        for (const pointName of Object.keys(points)) {
            const point = points[pointName];
            points[pointName] = this.rotatePoint({
                radians: fiRadians,
                pivot,
                point,
            });
        }

        console.log(points)

        this.line(points.A, points.B);
        this.line(points.B, points.C);
        this.line(points.C, points.D);
        this.line(points.D, points.A);
        this.line(points.B, points.E);
        this.line(points.E, points.C);

        const bigHouseArgs = [
            n - 1,            // n
            points.B[0],        // x0
            points.B[1],        // y0
            leftLeg,            // a
            fi + alpha,              // fi
            alpha,              // alpha
        ];

        const littleHouseArgs = [
            n - 1,            // n
            points.E[0],        // x0
            points.E[1],        // y0
            rightLeg,           // a
            fi - antiAlpha,         // fi
            alpha,              // alpha
        ];

        this.pifagor(...bigHouseArgs);
        this.pifagor(...littleHouseArgs);
    }
}

function init() {
    const canvas = document.getElementById('canvas');
    const nInput = document.getElementById('n');
    const x0Input = document.getElementById('x0');
    const y0Input = document.getElementById('y0');
    const aInput = document.getElementById('a');
    const fiInput = document.getElementById('fi');
    const alphaInput = document.getElementById('alpha');

    const drawer = new Pifagor(
        canvas, 
        [
            nInput,
            x0Input,
            y0Input,
            aInput,
            fiInput,
            alphaInput,
        ],
    );

    window.draw = () => drawer.start();
}