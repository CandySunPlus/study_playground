export default class OrderPage {
    initialize() {
        this.canvas = document.createElement('canvas');
        document.querySelector('.container').appendChild(this.canvas);
    }
    
    random(min, max) {
        return Math.floor((Math.random() * (max - min)) + min);
    }
    
    pageDidMounted() {
        this.retinaCanvas();
  
        let xs = [];
        let ys = [];
        let arr = [];
        
        for (let i = 10; i <= 85; i ++) {
            xs.push(i * 8);
            ys.push(i * 8);
        }
        
        ys.sort((a, b) => {
            return Math.floor(Math.random() * 10) - 5;
        });
        
        for (let i = 0; i < xs.length; i++) {
            arr[i] = [xs[i], ys[i]];
        }
        
        this.drawPointsFromArray(arr);
    }
    
    drawPointsFromArray(arr) {
        let context = this.canvas.getContext('2d');
        context.clearRect(0, 0, context.width, context.height);
        for (let item of arr) {
            this.drawPoint(item[0], item[1]);
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