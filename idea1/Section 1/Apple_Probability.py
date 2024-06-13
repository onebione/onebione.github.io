import math
import sys

alive_outcomes = 0
Apples_Total = int(input("Apples in Total: "))
Poisonous = int(input("Poisonous Apples: "))
Apples_To_Kill = int(input("Amount of Poisonous Apples to kill: "))
Apples_Eat = int(input("Amount of Apples You Will Eat: "))

if Apples_To_Kill > Poisonous or Apples_Eat > Apples_Total:
    print("You'll be fine ")
    sys.exit()

def binomial_coefficients(N, K):
    if N - K < 0:
        return 0
    result = (math.factorial(N)) // (math.factorial(K) * (math.factorial(N - K)))
    return result
    
for case_num in range(0, Apples_To_Kill):
    var1 = binomial_coefficients(Poisonous, case_num)
    var2 = binomial_coefficients(Apples_Total - Poisonous, Apples_Eat - case_num)
    var3 = binomial_coefficients(Apples_Total, Apples_Eat)
    Numerator = (var1) * (var2)
    Denominator = var3
    alive_outcomes += (Numerator / Denominator)

print(alive_outcomes)