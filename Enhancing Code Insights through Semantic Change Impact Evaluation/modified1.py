
modified_code = '''
def calculate_total_price(quantity, price_per_unit, tax_rate):
    subtotal = quantity * price_per_unit
    tax_amount = subtotal * tax_rate
    total_price = subtotal + tax_amount
    return total_price

items = [
    {"name": "Product A", "quantity": 2, "price_per_unit": 10.99},
    {"name": "Product B", "quantity": 1, "price_per_unit": 5.99},
    {"name": "Product D", "quantity": 4, "price_per_unit": 12.99}
]

total_cost = 0
for item in items:
    total_cost += calculate_total_price(item['quantity'], item['price_per_unit'], 0.08)

print("Total cost including tax:", total_cost)
'''
