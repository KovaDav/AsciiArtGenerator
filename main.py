import PIL.Image

def main():
    path = input("Enter the path to the image : \n")
    try:
        image = PIL.Image.open(path)
        resize(image, int(input("Enter desired image size:")))
    except:
        print(path, "Unable to find image ");


ASCII_CHARS = ["@", "#", "$", "%", "?", "*", "+", ";", ":", ",", "."]

def resize(image, new_width):
    width, height = image.size
    new_height = new_width * height / width
    return image.resize((new_width, new_height))



main()