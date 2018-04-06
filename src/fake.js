var router = require('express').Router();


var messages = [
    'saturation point knife bomb monofilament tattoo office fetishism assault city denim. receding rain youtube into woman drugs jeans assassin Tokyo faded. 3D-printed systema military-grade fluidity j-pop bomb carbon vinyl cyber- table. decay j-pop long-chain hydrocarbons faded neon sprawl -ware sign assault decay. marketing math- cardboard Tokyo drone warehouse range-rover systemic skyscraper shoes. systema systema drugs bicycle j-pop assassin nodality youtube rifle girl. nodal point apophenia render-farm tattoo crypto- sign pen dolphin smart- range-rover. assassin pen gang systema paranoid wristwatch ablative shoes silent footage.',
    '3D-printed marketing boy faded marketing military-grade face forwards bomb courier shrine. spook vinyl refrigerator apophenia kanji engine camera girl otaku math-. j-pop refrigerator beef noodles sunglasses stimulate drone dome BASE jump pre- wristwatch. refrigerator dolphin man towards systema rebar face forwards receding towards assault. futurity nodal point decay assault DIY knife media youtube tanto spook. DIY towards industrial grade rifle RAF convenience store knife alcohol Shibuya youtube. tube long-chain hydrocarbons narrative savant math- marketing office monofilament saturation point advert. advert spook tower media denim sprawl nodality rebar pen Kowloon.',
    '-ware apophenia range-rover plastic systemic RAF engine rebar semiotics dead. youtube futurity disposable corrupted into skyscraper monofilament tube franchise media. woman rebar dome neural human corporation assassin crypto- long-chain hydrocarbons singularity. refrigerator human faded modem knife shanty town nodality apophenia Shibuya pistol. monofilament faded network euro-pop motion urban knife papier-mache boy camera. geodesic -space pre- pre- sensory convenience store soul-delay receding Shibuya table. j-pop boat futurity tiger-team 3D-printed pen euro-pop DIY network geodesic. car hotdog industrial grade 8-bit Shibuya assault footage market semiotics wonton soup. ',
    'girl gang fluidity papier-mache decay sensory papier-mache drone smart- realism. into render-farm stimulate cardboard table voodoo god gang jeans saturation point engine. man car boat receding man j-pop systemic neon jeans geodesic. neon tattoo sensory table industrial grade -space city physical city order-flow. boy assassin post- corporation sign apophenia drone digital katana euro-pop. rifle sign nodal point into paranoid Legba bridge uplink Chiba savant. bridge courier nano- wonton soup Chiba woman modem narrative dolphin tower. otaku camera marketing lights augmented reality meta- beef noodles into order-flow wonton soup.'
];
router.get('/message/:message', function(req, res, next){
    var index = getRandomInt(messages.length - 1);

    res.send(messages[index]);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = router;
