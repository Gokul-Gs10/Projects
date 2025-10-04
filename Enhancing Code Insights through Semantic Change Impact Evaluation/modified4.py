
def calculate_area(radius):
    return 3.14159 * radius ** 2

def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

def insert_sorted(arr, value):
    for i in range(len(arr)):
        if arr[i] > value:
            arr.insert(i, value)
            return arr
    arr.append(value)
    return arr

# Test functions
radius = 7
print("Area of circle with radius", radius, ":", calculate_area(radius))

numbers = [2, 6, 8, 10, 14, 18]
target = 14
result = linear_search(numbers, target)
if result != -1:
    print(f"Element {target} found at index {result}")
else:
    print(f"Element {target} not found in the array")

values = [1, 3, 5, 7, 9]
new_value = 6
updated_values = insert_sorted(values, new_value)
print("Array after inserting", new_value, "in sorted order:", updated_values)
