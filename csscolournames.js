(function(){

  var cols = ['AliceBlue','AntiqueWhite','Aqua','Aquamarine',
  'Azure','Beige','Bisque','Black','BlanchedAlmond','Blue',
  'BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse',
  'Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson',
  'Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray',
  'DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen',
  'DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen',
  'DarkSlateBlue','DarkSlateGray','DarkTurquoise','DarkViolet',
  'DeepPink','DeepSkyBlue','DimGray','DodgerBlue','FireBrick',
  'FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite',
  'Gold','GoldenRod','Gray','Green','GreenYellow','HoneyDew',
  'HotPink','IndianRed ','Indigo  ','Ivory','Khaki','Lavender',
  'LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral',
  'LightCyan','LightGoldenRodYellow','LightGray','LightGreen',
  'LightPink','LightSalmon','LightSeaGreen','LightSkyBlue',
  'LightSlateGray','LightSteelBlue','LightYellow','Lime','LimeGreen',
  'Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue',
  'MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue',
  'MediumSpringGreen','MediumTurquoise','MediumVioletRed',
  'MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite',
  'Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed',
  'Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed',
  'PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue',
  'Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue',
  'SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell',
  'Sienna','Silver','SkyBlue','SlateBlue','SlateGray','Snow',
  'SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato',
  'Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow',
  'YellowGreen'];

  var colname = document.querySelector('#colourname');
  var result = document.querySelector('#result');
  var list = document.querySelector('ul');
  var amounts = document.querySelector('#amounts');
  var counter = document.querySelector('#counter');
  var currentcol = 'white';
  var allmoves = 0;
  var right = 0;
  var swabnumber = 37;

  function init() {
    if (localStorage.zomgcsscolourstate) {
      var chunks = localStorage.zomgcsscolourstate.split('x');
      allmoves = chunks[1];
      right = chunks[0];
      swabnumber = chunks[2] || 37;
    } else {
      localStorage.zomgcsscolourstate = right + 'x' + allmoves + 'x' + swabnumber;
    }
    updatecounter(right, allmoves);
    randomswabs();
  }

  init();

  function updatecounter(right, allmoves) {
    counter.innerHTML = '<span class="right">' + right +
                        '</span>/<span class="wrong">' +
                         allmoves+'</span>';
  }

  list.addEventListener('click', function(ev) {
    ev.preventDefault();
    var target = ev.target;
    if (target.tagName === 'A') {
      var col = target.getAttribute('data-title');
      if (col === currentcol) {
        ++right;
        ++allmoves;
        updatecounter(right, allmoves);
        save();
        result.innerHTML = '';
        init();
      } else {
        ++allmoves;
        save();
        updatecounter(right, allmoves);
        result.innerHTML = 'nope… (' + col + ')';
      }
    }
  });

  amounts.addEventListener('click', function(ev) {
    ev.preventDefault();
    var target = ev.target;
    if (target.tagName === 'BUTTON') {
      swabnumber = target.getAttribute('data-amount');
      save();
      init();
    }
  });

  function save() {
    localStorage.zomgcsscolourstate = right + 'x' + allmoves +
                                      'x' + swabnumber;
  }

  function randomswabs() {
    var list = document.querySelector('ul');
    var out ='';
    var newrand = [];
    if (swabnumber === 'all') {
      newrand = shuffle(cols);
    } else {
      newrand = shuffle(cols).slice(0, +swabnumber);
    }
    var all = newrand.length;
    var index = Math.random() * all | 0;
    currentcol = newrand[index];
    colname.innerHTML = currentcol;
    while(--all) {
      out += '<li><a href="#"  data-title="' + newrand[all] +
             '" style="background:' + newrand[all] +
             '"></a></li>';
    }
    list.innerHTML = out;
  }

  function shuffle(array) {
    var newarray = array.slice(0);
    var currentIndex = newarray.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = newarray[currentIndex];
      newarray[currentIndex] = newarray[randomIndex];
      newarray[randomIndex] = temporaryValue;
    }
    return newarray;
  }

  document.addEventListener('keydown', function(ev) {
    if (ev.which === 191) {
      document.querySelector('a[data-title^=' + currentcol +
                             ']').innerHTML = '!';
      }
  });
  document.addEventListener('keyup', function(ev) {
      document.querySelector('a[data-title^=' + currentcol +
                             ']').innerHTML = '';
  });
  document.querySelector('button').addEventListener('click',
    function(ev) {
      localStorage.zomgcsscolourstate = '0x0';
      init();
  });

})();