export default class OrderPage {
    initialize() {
        this.changes = [];
        this.canvas = document.createElement('canvas');
        document.querySelector('.container').appendChild(this.canvas);
    }

    random(min, max) {
        return Math.floor((Math.random() * (max - min)) + min);
    }

    pageDidMounted() {
        this.retinaCanvas();
        this.pointMap = this.initPointMap();
        this.qs(this.pointMap[1], 0, this.pointMap[1].length - 1);
        window.requestAnimationFrame(() => this.drawAnimation());
    }
    
    drawAnimation() {
        if (this.changes.length > 0) {
            this.drawPointsFromArray(this.changes.shift());
            window.requestAnimationFrame(() => this.drawAnimation());
        }
    }

    qs(arr, start, end) {
        this.changes.push(JSON.parse(JSON.stringify(this.pointMap)));
        if (start < end) {
            let pos = this.partition(arr, start, end);
            this.qs(arr, start, pos - 1);
            this.qs(arr, pos + 1, end);
        }
    }

    partition(arr, start, end) {
        let tmp = arr[start];
        let s = start;
        let e = end + 1;
        while (1) {
            while (arr[++s] < tmp);
            while (arr[--e] > tmp);
            if (s > e) break;
            let exTmp = arr[s];
            arr[s] = arr[e];
            arr[e] = exTmp;
        }
        arr[start] = arr[e];
        arr[e] = tmp;
        return e;
    }

    initPointMap() {
        let xs = [];
        let ys = [];
        let arr = [];

        for (let i = 10; i <= 85; i++) {
            xs.push(i * 8);
            ys.push(i * 8);
        }

        ys.sort((a, b) => {
            return Math.floor(Math.random() * 10) - 5;
        });

        return [xs, ys];
    }

    drawPointsFromArray(arr) {
        let context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let [index, x] of arr[0].entries()) {
            this.drawPoint(x, arr[1][index]);
        }
    }

    drawPoint(x, y) {
        let context = this.canvas.getContext('2d');
        context.beginPath();
        context.arc(x, y, 3, 0, 2 * Math.PI, true);
        context.stroke();
        context.fill();
    }

    retinaCanvas() {
        let context = this.canvas.getContext('2d'),
            devicePixelRatio = window.devicePixelRatio || 1,
            backingStoreRatio = context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1,
            ratio = devicePixelRatio / backingStoreRatio;

        this.canvas.width = this.canvas.offsetWidth * ratio;
        this.canvas.height = this.canvas.offsetHeight * ratio;
    }

    render() {
        this.initialize();
        this.pageDidMounted();
    }
}