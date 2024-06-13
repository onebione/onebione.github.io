import math
import sys

alive_outcomes = 0
total_outcomes = 0

Apples_Total = int(input("Apples in Total: "))
Poisonous = int(input("Poisonous Apples: "))
Apples_To_Kill = int(input("Amount of Poisonous Apples to kill: "))
Apples_Eat = int(input("Amount of Apples You Will Eat: "))

if Apples_To_Kill > Poisonous or Apples_Eat > Apples_Total:
    print("You'll be fine, the apple amounts make no sense")
    sys.exit()

def binomial_coefficients(N, K):
    if K > N:
        return 0
    return math.comb(N, K)
    
for case_num in range(0, Apples_To_Kill):
    var1 = binomial_coefficients(Poisonous, case_num)
    var2 = binomial_coefficients(Apples_Total - Poisonous, Apples_Eat - case_num)
    alive_outcomes += (var1) * (var2)

total_outcomes = binomial_coefficients(Apples_Total, Apples_Eat)

print(str((alive_outcomes / total_outcomes) * 100) + "%")