def describe_pet(pet_name, animal_type="dog"):
    print(f"I have a {animal_type} named {pet_name}.")


describe_pet(pet_name="sugar")  # 输出: I have a dog named sugar.
describe_pet(animal_type="hamster", pet_name="Harry")
