import unittest
import main




class TestMain(unittest.TestCase):
    def test_braille_character_printer(self):
        binary_array = [0,1,1,0,0,1,1,1]
        self.assertEqual(main.braille_character_printer(binary_array), 10289)

    def test_binary_array_creator(self):
        pixel_array = [12,23,231,128,125,127,255,0]
        self.assertEqual(main.binary_array_creator(pixel_array), [0,0,1,1,0,0,1,0])

    def test_pixel_array_extender(self):
        pixel_array = [[1,1,1,1,1], [1,1,1,1,1], [1,1,1,1,1]]
        self.assertEqual(main.pixel_array_extender(pixel_array), [[1,1,1,1,1,0], [1,1,1,1,1,0], [1,1,1,1,1,0], [0,0,0,0,0,0]])

    def test_pixel_array_divider(self):
        pixel_array = [[1,1,0,1,1,0], [1,0,1,0,1,0], [0,1,0,1,0,0], [0,0,0,0,0,0]]
        self.assertEqual(main.pixel_array_divider(pixel_array), [1,1,1,0,0,1,0,0,0,1,1,0,0,1,0,0,1,0,1,0,0,0,0,0])
    def test_braille_string_creator(self):
        binary_array_container = [1,1,1,0,0,1,0,0,0,1,1,0,0,1,0,0,1,0,1,0,0,0,0,0]
        self.assertEqual(main.braille_string_creator(binary_array_container, 50), "asd")


if __name__ == '__main__':
    unittest.main()