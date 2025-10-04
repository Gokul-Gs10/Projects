
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

def is_prime(n):
    if n <= 1:
        return False
    elif n <= 3:
        return True
    elif n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

# Test functions
number = 15
print(f"Factorial of {number}: {factorial(number)}")
print(f"Fibonacci sequence up to {number}:", end=" ")
for i in range(number):
    print(fibonacci(i), end=" ")
print("\nPrime numbers up to", number, ":", [x for x in range(number) if is_prime(x)])
