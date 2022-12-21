const section = document.getElementById('section');

function setSection(sectionName) {
    section.innerHTML = sections[sectionName];
}

const sections = {
    pifagor: `<div class="controls">
                <div class="inputs">
                    <div class="input">
                        <label for="n">n - глубина рекурсии</label>
                        <input id="n" type="number" value="5"/>
                    </div>
                    <div class="input">
                        <label for="x0">x0 - координата х точки привязки</label>
                        <input id="x0" type="number" value="800"/>
                    </div>
                    <div class="input">
                        <label for="y0">y0 - координата y точки привязки</label>
                        <input id="y0" type="number" value="100"/>
                    </div>
                    <div class="input">
                        <label for="a">a - длина основания</label>
                        <input id="a" type="number" value="100"/>
                    </div>
                    <div class="input">
                        <label for="fi">fi - угол наклона основания</label>
                        <input id="fi" type="number" value="0"/>
                    </div>
                    <div class="input">
                        <label for="alpha">alpha - угол наклона крыши</label>
                        <input id="alpha" type="number" value="30"/>
                    </div>
                </div>
                <button onclick="draw('pifagor')" style="width: 100px; height: 30px">Нарисовать</button>
            </div>`,
    circle: `<div class="controls">
                <div class="inputs">
                    <div class="input">
                        <label for="x0">x0 - координата х центра окружности</label>
                        <input id="x0" type="number" value="300"/>
                    </div>
                    <div class="input">
                        <label for="y0">y0 - координата y центра окружности</label>
                        <input id="y0" type="number" value="300"/>
                    </div>
                    <div class="input">
                        <label for="r">r - радиус окружности</label>
                        <input id="r" type="number" value="100"/>
                    </div>
                    <div class="input">
                        <label for="c">c - цвет окружности</label>
                        <input id="c" type="text" value="30"/>
                    </div>
                    <div class="input">
                        <label for="pixelScale">pixelScale - масштаб по отношению к пикселю</label>
                        <input id="pixelScale" type="number" value="1"/>
                    </div>
                </div>
                <button onclick="draw('circle')" style="width: 100px; height: 30px">Нарисовать</button>
            </div>`,
    line: `<div class="controls">
                <div class="inputs">
                    <div class="input">
                        <label for="x1">x1 - координата х точки начала</label>
                        <input id="x1" type="number" value="100"/>
                    </div>
                    <div class="input">
                        <label for="y1">y1 - координата y точки начала</label>
                        <input id="y1" type="number" value="100"/>
                    </div>
                    <div class="input">
                        <label for="x2">x2 - координата х конечной точки</label>
                        <input id="x2" type="number" value="300"/>
                    </div>
                    <div class="input">
                        <label for="y2">y2 - координата y конечной точки</label>
                        <input id="y2" type="number" value="300"/>
                    </div>
                    <div class="input">
                        <label for="c">c - цвет линии</label>
                        <input id="c" type="text" value="green"/>
                    </div>
                    <div class="input">
                        <label for="pixelScale">pixelScale - масштаб по отношению к пикселю</label>
                        <input id="pixelScale" type="number" value="1"/>
                    </div>
                </div>
                <button onclick="draw('line')" style="width: 100px; height: 30px">Нарисовать</button>
            </div>`,
    newPifagor: `<div class="controls">
                    <div class="inputs">
                        <div class="input">
                            <label for="n">n - глубина рекурсии</label>
                            <input id="n" type="number" value="5"/>
                        </div>
                        <div class="input">
                            <label for="x0">x0 - координата х точки привязки</label>
                            <input id="x0" type="number" value="800"/>
                        </div>
                        <div class="input">
                            <label for="y0">y0 - координата y точки привязки</label>
                            <input id="y0" type="number" value="100"/>
                        </div>
                        <div class="input">
                            <label for="a">a - длина основания</label>
                            <input id="a" type="number" value="100"/>
                        </div>
                        <div class="input">
                            <label for="fi">fi - угол наклона основания</label>
                            <input id="fi" type="number" value="0"/>
                        </div>
                        <div class="input">
                            <label for="alpha">alpha - угол наклона крыши</label>
                            <input id="alpha" type="number" value="30"/>
                        </div>
                        <div class="input">
                            <label for="pixelScale">pixelScale - масштаб по отношению к пикселю</label>
                            <input id="pixelScale" type="number" value="1"/>
                        </div>
                    </div>
                    <button onclick="draw('newPifagor')" style="width: 100px; height: 30px">Нарисовать</button>
                </div>`,
};

setSection('line');
