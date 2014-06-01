import jsonpickle
from PIL import Image, ImageDraw, ImageFont


f = open('../save/levels.json', 'r')
myLevels = jsonpickle.decode(f.read())

textLevels = {}

for a in myLevels:
    print(a['name'])
    textLevels[a['name']] = ''
    for y in a['groundLayer']:
        for x in y:
            if x == 1:
                textLevels[a['name']] += '_'
            elif x == 2:
                textLevels[a['name']] += '#'
            elif x == 4:
                textLevels[a['name']] += "#"
        textLevels[a['name']] += "\n"
    textLevels[a['name']] = textLevels[a['name']].splitlines()


for a in myLevels:
    img = Image.open("canvas.png")
    draw = ImageDraw.Draw(img)
    # font = ImageFont.truetype(<font-file>, <font-size>)
    font = ImageFont.truetype("font.ttf", 20)
    # draw.text((x, y),"Sample Text",(r,g,b))
    y = 0
    for i in textLevels[a['name']]:
        draw.text((0, y), i, (0, 0, 0), font=font)
        y += 20
    img.save(str(a['name']) + ".png")

