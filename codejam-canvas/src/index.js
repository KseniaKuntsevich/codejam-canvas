class Canvas {
    constructor(props) {
        this.canvas = props.canvas;
        this._matrixes = props.matrixes;
        this._activeMatrix = [
            ['gray']
        ];
        this._activeMatrixItem = {
            type: null,
            data: null
        }

    }

    setActiveMatrix(id) {
        this._activeMatrix = this._matrixes[id] ? this._matrixes[id] : this._activeMatrix;

    }

    addMatrix(props) {
        this._matrixes[props.id] = props[matrix];

    }

    setActiveMatrixItem(content) {
        let color;

        if (typeof content === "string") {

            let s = new Option().style;
            s.color = content;

            let isString = s.color === content.toLowerCase();
            let isHex = /^#[0-9A-F]{6}$/i.test('#' + content);

            if (isHex) color = '#' + content;

            if (isString) color = content;


        } else if (Array.isArray(content) && content.length === 4) {
            let rgba = 'rgba(' + content[0] + ',' + content[1] + ',' + content[2] + ',' + (Math.round(content[3] / 255), 1)+ ')';
            let isRgba = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(rgba)
            if (isRgba) color = rgba;

        } else if (content.img) {
            this._activeMatrixItem.type = "image";
            this._activeMatrixItem.data = content.img;

        }

        if (color) {
            this._activeMatrixItem.type = "color";
            this._activeMatrixItem.data = color;

        }


    }

    showMatrix() {
        const matrix = this._activeMatrix;

        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const cellWight = Math.floor(canvas.width / matrix[0].length);
        const rowHeight = Math.floor(canvas.height / matrix.length);

        let x = 0,
            y = 0;

        matrix.forEach((row, i) => {
            row.forEach((content, j) => {

                this.setActiveMatrixItem(content);

                this.drawActiveMatrixItem(x, y, cellWight, rowHeight)

                x += cellWight;

            })

            x = 0;

            y += rowHeight;

        })

    }

    drawActiveMatrixItem(x, y, cellWight, rowHeight) {
        if (this.canvas.getContext) {

            let ctx = this.canvas.getContext('2d');

            let item = this._activeMatrixItem;

            switch (item.type) {
                case 'color':
                    ctx.fillStyle = item.data;
                    ctx.fillRect(x, y, cellWight, rowHeight);
                    break;

                case 'image':
                    let n = x,
                        j = y;
                    item.data.onload = () => ctx.drawImage(item.data, n, j, cellWight, rowHeight);
                    ctx.drawImage(item.data, n, j, cellWight, rowHeight);
                    break;

                default:
                    alert('Something goes wrong 0_0');

            }

        }

    }


}


let matrix1 = JSON.parse(matrixData1);
let matrix2 = JSON.parse(matrixData2);
let img = new Image();
img.src = './data/image.png';
let matrix3 = [
    [{
        img: img
    }]
];

let canv = new Canvas({
    canvas: document.getElementById('canvas'),
    matrixes: {
        matrix1: matrix1,
        matrix2: matrix2,
        matrix3: matrix3
    }

})

canv.showMatrix();


const sizeSwitcher = document.getElementById('sizeSwitcher');
sizeSwitcher.addEventListener('click', (e) => {
    let id = e.target.dataset.matrixId;
    if (id) canv.setActiveMatrix(id);
    canv.showMatrix();
});