export default class MapPoint {
    constructor(name, x, y, n, e, s, w) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.n = n;
        this.e = e;
        this.s = s;
        this.w = w;
    }

    getName() {
        return this.name;
    }
}