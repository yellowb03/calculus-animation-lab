"""Independent symbolic verification of the twelve selected homework answers."""
import json
from pathlib import Path
import sympy as s

x,h,t,u=s.symbols('x h t u',real=True)
checks={}
def check(name, actual, expected):
    delta=s.simplify(actual-expected)
    assert delta==0,(name,actual,expected,delta)
    checks[name]={'actual':str(actual),'expected':str(expected),'pass':True}

check('01 conjugate limit',s.limit((s.sqrt(9+h)-3)/h,h,0),s.Rational(1,6))
check('02 common denominator',s.limit(1/t-1/(t*t+t),t,0),1)
check('03 definition of derivative',s.limit(((x+h)**4-x**4)/h,h,0),4*x**3)
check('04 product derivative',s.diff(s.sqrt(x)*(x+2*s.sqrt(x)),x),s.Rational(3,2)*s.sqrt(x)+2)
check('05 quotient derivative',s.diff((u+2)**2/(1-u),u),(-u*u+2*u+8)/(1-u)**2)
check('06 nested chain derivative',s.diff(s.tan(s.sqrt(1+t*t)),t),t*s.sec(s.sqrt(1+t*t))**2/s.sqrt(1+t*t))
y=s.symbols('y',real=True)
curve=2*(x*x+y*y)**2-25*(x*x-y*y)
check('07 point lies on curve',curve.subs({x:3,y:1}),0)
check('07 implicit slope',(-s.diff(curve,x)/s.diff(curve,y)).subs({x:3,y:1}),-s.Rational(9,13))
check('07 tangent point',(-s.Rational(9,13)*x+s.Rational(40,13)).subs(x,3),1)
a,b,theta=s.symbols('a b theta',real=True)
A=a*b*s.sin(theta)/2
vals={a:2,b:3,theta:s.pi/3}
rate=lambda ap,bp,tp: (s.diff(A,a)*ap+s.diff(A,b)*bp+s.diff(A,theta)*tp).subs(vals)
check('08a related rates',rate(0,0,s.Rational(1,5)),s.Rational(3,10))
check('08b related rates',rate(0,s.Rational(3,2),s.Rational(1,5)),3*s.sqrt(3)/4+s.Rational(3,10))
check('08c related rates',rate(s.Rational(5,2),s.Rational(3,2),s.Rational(1,5)),21*s.sqrt(3)/8+s.Rational(3,10))
f=2/s.sqrt(x*x-5)
check('09 f(3)',f.subs(x,3),1)
check('09 slope',s.diff(f,x).subs(x,3),-s.Rational(3,4))
check('09 linearization',f.subs(x,3)+s.diff(f,x).subs(x,3)*(x-3),1-s.Rational(3,4)*(x-3))
f=2*s.cos(t)+s.sin(2*t)
check('10 derivative identity',s.diff(f,t),-2*(2*s.sin(t)-1)*(s.sin(t)+1))
check('10 critical point',s.diff(f,t).subs(t,s.pi/6),0)
check('10 left endpoint',f.subs(t,0),2)
check('10 maximum',f.subs(t,s.pi/6),3*s.sqrt(3)/2)
check('10 right endpoint and minimum',f.subs(t,s.pi/2),0)
assert s.solveset(s.diff(f,t),t,domain=s.Interval(0,s.pi/2))==s.FiniteSet(s.pi/6)
assert 3*s.sqrt(3)/2>2>0
check('11 infinity conjugate',s.limit(s.sqrt(25*t*t+2)-5*t,t,s.oo),0)
check('12 reciprocal substitution',s.limit(x*s.sin(1/x),x,s.oo),1)
dest=Path(__file__).resolve().parents[1]/'qa'/'math_verification.json'
dest.write_text(json.dumps({'checks':checks,'count':len(checks),'status':'PASS','notes':['Domains: lesson 03 function and derivative are real on all R.','Lesson 04 product-rule expression applies for x>0; right derivative at 0 is 2 if endpoint derivatives are considered.','Lesson 06 excludes tan poles. Lesson 09 uses a neighborhood of x=3 inside x>sqrt(5).','Related rates are area per minute, not spatial force derivatives.','Extrema set exhaustiveness independently checked on the closed interval.']},indent=2),encoding='utf-8')
print(f'{len(checks)} exact symbolic checks passed. {dest}')
