import PIL.Image

def main():
    path = input("Enter the path to the image : \n")
    try:
        image = PIL.Image.open(path)
    except:
        print(path, "Unable to find image ");

    return path

main()