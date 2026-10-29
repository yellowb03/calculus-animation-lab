# Source verification

All selected section/exercise pairs were checked against hw2.png through hw7.png in the workspace. All selected sections lie within the scope in midterm details.png: Chapter 1 sections 1.1-1.6 and 1.8; Chapter 2 sections 2.1-2.9; Chapter 3 sections 3.1-3.5. Selection does not predict the actual exam.

The following original textbook pages were rendered and visually inspected, independently of the existing worked-solutions manual:

| Videos | Original textbook file | Printed page | PDF page (1-based) | Checked input |
|---|---|---:|---:|---|
|01,02|Textbook/01 - Chapter 1 - Functions and Limits.pdf|71|65|1.6 #23: sqrt(9+h)-3 over h; #28: 1/t-1/(t²+t)|
|03|Textbook/02 - Chapter 2 - Derivatives.pdf|130|24|2.2 #28: x⁴; definition required and both domains requested|
|04|same Chapter 2 file|143|37|2.3 #32: sqrt(x)(x+2sqrt(x)); Product Rule explicitly required|
|05|same Chapter 2 file|144|38|2.3 #42: (u+2)²/(1-u)|
|06|same Chapter 2 file|162|56|2.5 #37: tan(sqrt(1+t²))|
|07|same Chapter 2 file|170|64|2.6 #33: 2(x²+y²)²=25(x²-y²), point (3,1), tangent required|
|08|same Chapter 2 file|189|83|2.8 #8: triangle area; all three parts and rates 0.2, 1.5, 2.5|
|09|same Chapter 2 file|196|90|2.9 #4: 2/sqrt(x²-5), a=3, linearization required|
|10|Textbook/03 - Chapter 3 - Applications of Differentiation.pdf|217|9|3.1 #59: 2cos(t)+sin(2t), closed interval [0,pi/2]|
|11,12|same Chapter 3 file|248|40|3.4 #25: sqrt(25t²+2)-5t as t->infinity; #31: x sin(1/x) as x->infinity|

Original page renders are retained in qa/originals. Independent answer verification: source/verify_math.py and qa/math_verification.json (22 exact symbolic assertions, plus exhaustive extrema critical-set check).
