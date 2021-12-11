export default class MapPoint {
    constructor(name, scenekey, x, y, n, e, s, w) {
        this.name = name;
        this.scenekey = scenekey;
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