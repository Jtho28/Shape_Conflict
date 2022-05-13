
class MathPoint{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  length(){
    return Math.sqrt(this.lengthSquared())
  }
  lengthSquared(){
    return this.x**2+this.y**2;
  }
  normalized(){
    let len = this.length();
    return new MathPoint(this.x/len, this.y/len);
  }
  orthogonal(){
    let norm = this.normalized();
    return new MathPoint(-norm.y, norm.x);
  }
  plus(p){
    return new MathPoint(this.x + p.x, this.y+p.y);
  }
  minus(p){
    return new MathPoint(this.x - p.x, this.y - p.y);
  }
  dot(p){
    return this.x*p.x+this.y*p.y;
  }
  scale(f){
    return new MathPoint(this.x*f, this.y*f);
  }
}

export default MathPoint;