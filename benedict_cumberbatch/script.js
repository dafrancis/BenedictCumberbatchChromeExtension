
var firstnamelist = ["Bumblebee", "Bandersnatch", "Broccoli", "Rinkydink", "Bombadil", "Boilerdang",
                     "Bandicoot", "Fragglerock", "Muffintop", "Crumplesack", "Congleton", "Blubberdick",
                     "Buffalo", "Benadryl", "Butterfree", "Burberry", "Whippersnatch", "Buttermilk",
                     "Beezlebub", "Budapest", "Boilerdang", "Blubberwhale", "Bumberstump", "Bulbasaur",
                     "Cogglesnatch", "Liverswort", "Bodybuild", "Johnnycash", "Bendydick", "Burgerking",
                     "Bonaparte", "Hairycooch", "Bunsenburner", "Billiardball", "Bukkake", "Baseballmitt",
                     "Blubberbutt", "Baseballbat", "Rumblesack", "Barister", "Danglerack", "Rinkydink",
                     "Bombadil", "Honkytonk", "Billyray", "Bumbleshack", "Snorkeldink", "Anglerfish",
                     "Beetlejuice", "Bedlington", "Bandicoot", "Boobytrap", "Blenderdick", "Bentobox",
                     "Anallube", "Pallettown", "Wimbledon", "Hairyballs", "Buttercup", "Blasphemy",
                     "Syphilis", "Snorkeldink", "Brandenburg", "Barbituate", "Snozzlebert", "Tiddleywomp",
                     "Bouillabaisse", "Wellington", "Benetton", "Bendandsnap", "Timothy", "Brewery",
                     "Bentobox", "Brandybuck"];
var lastnamelist = ["Coddleswort", "Curdlesnoot", "Calldispatch", "Humperdinck", "Rivendell",
                    "Cuttlefish", "Lingerie", "Vegemite", "Ampersand", "Cumberbund", "Candycrush",
                    "Clombyclomp", "Cragglethatch", "Nottinghill", "Cabbagepatch", "Camouflage",
                    "Creamsicle", "Curdlemilk", "Upperclass", "Frumblesnatch", "Crumplehorn",
                    "Talisman", "Candlestick", "Chesterfield", "Bumbersplat", "Scratchnsniff",
                    "Snugglesnatch", "Charizard", "Ballsacksnip", "Carrotstick", "Cumbercooch",
                    "Crackerjack", "Crucifix", "Cuckatoo", "Cockletit", "Collywog", "Gigglesnort",
                    "Capncrunch", "Covergirl", "Cumbersnatch", "Countryside","Coggleswort",
                    "Splishnsplash", "Copperwire", "Animorph", "Curdledmilk", "Cheddarcheese",
                    "Cottagecheese", "Crumplehorn", "Snickersbar", "Banglesnatch", "Stinkyrash",
                    "Cameltoe", "Chickenbroth", "Concubine", "Candygram", "Moldyspore", "Chuckecheese",
                    "Cankersore", "Crimpysnitch", "Wafflesmack", "Chowderpants", "Toodlesnoot",
                    "Clavichord", "Cuckooclock", "Oxfordshire", "Cumbersome", "Chickenstrips",
                    "Battleship", "Commonwealth", "Cunningsnatch", "Custardbath", "Kryptonite"];

var fullnamelist = ["Wimbledon Tennismatch", "Rinkydink Curdlesnoot", "Butawhiteboy Cantbekhan",
                    "Benadryl Claritin", "Bombadil Rivendell", "Wanda's Crotchfruit", "Biblical Concubine",
                    "Butawhiteboy Cantbekhan", "Syphilis Cankersore", "Benedict Timothy Carlton Cumberbatch",
                    "Candycrush Templerun"];

function getRandFromList(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function walk(node) {
    // I stole this function from here:
    // http://is.gd/mwZp7E
    
    var child, next;

    switch ( node.nodeType )  
    {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while ( child ) 
            {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case 3: // Text node
            handleText(node);
            break;
    }
}

function handleText(textNode) {
    var v = textNode.nodeValue;

    v = v.replace(/\bBenedict Cumberbatch\b/ig, function generate_fullname() {
        var random1 = getRandFromList(firstnamelist),
            random2 = getRandFromList(lastnamelist),
            randomfull = getRandFromList(fullnamelist),
            numberroll = Math.floor(Math.random() * 10) + 1;
        
        return numberroll > 9 ? randomfull : (random1 + " " + random2);
    });

    v = v.replace(/\bBenedict\b/ig, function () {
        return getRandFromList(firstnamelist);
    });

    v = v.replace(/\bCumberbatch\b/ig, function () {
        return getRandFromList(lastnamelist);
    });

    textNode.nodeValue = v;
}

var timeout = null;
document.addEventListener('DOMSubtreeModified', function () {
    if (timeout) {
        clearTimeout(timeout);
    }
    setTimeout(function(){
        walk(document.body);
    }, 500);
});

walk(document.body);
