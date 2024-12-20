export default class Tile{
    #tileEle
    #x
    #y
    #value

    constructor(tileCont, value = Math.random()>.5 ? 2 : 4){
        this.#tileEle = document.createElement("div")
        this.#tileEle.classList.add('tile')
        tileCont.append(this.#tileEle)
        this.value = value
    }


    get value(){
        return this.#value
    }
    
    set value(v){
        this.#value = v
        this.#tileEle.textContent = v;
        const power = Math.log2(v)
        const background_lightness = 100 - power*9
        this.#tileEle.style.setProperty("--background-color", `${background_lightness}%`)
        this.#tileEle.style.setProperty("--text-color", `${background_lightness<=50 ? 90:10}%`)
    }

    set x(value){
        this.#x = value
        this.#tileEle.style.setProperty('--x',value)
    }
    set y(value){
        this.#y = value
        this.#tileEle.style.setProperty('--y',value)

    }

    remove(){
        this.#tileEle.remove()
    }
}