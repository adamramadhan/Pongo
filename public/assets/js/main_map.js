$(document).ready(function() {
    var key = '2011-11';
    var loadedLayer = [];
    var availableLayer = ['indonesia', '2011-11', '2012-06', '2012-09', '2012-12'];
    var mapColor = ['#FF3300', '#9999CC', '#33CCFF', '#3300FF', '#FF0000'];
    var currLayer = '';
    var colorIndex = 0;
    var map = Kartograph.map('#map');
    var maxRad = 50; 

    map.addLayerMod = function(name, callback) {
        currLayer = name;
        this.addLayer(name, callback, { chunks: 50 }); 
    }

    map.loadMapMod = function(name, callback, zoom ) {
        currLayer = name;
        this.loadMap(name, callback, { 
            zoom: zoom
        });
    }

    map.loadMapMod('/assets/svg/indonesia.svg', function() {

        updateLayer = function(key) {
            map.addLayerMod('indonesia', {
                styles: {
                    fill: '#fff',
                    stroke: '#85c5d3',
                    'stroke-width':1 
                }
            });

            if (colorIndex < mapColor.length - 1) {
                colorIndex++;
            } else {
                colorIndex = 0;
            }

            console.log('Color = ' + mapColor[colorIndex] + colorIndex);

            map.addLayerMod(key, {
                styles: {
                    fill: '#FF0000',
                    stroke: '#fff',
                    'fill-opacity': 0.5
                }
            });   

            map.addSymbols({
                type: Kartograph.Bubble,
                data: [{ name: 'Orangutan 2011', lon: -1.675176, lat:114.136047}],
                location: function(d) { return [d.lon, d.lat]},
                r: 20, 
                stroke: '#000',
                text: 'Orangutan 2011'
            }); 
        }

        updateLayer(key);

/*
        // Taken from kartograph showcase 
        $.getJSON('/population?period=key', function(pongoPopulations) {

            pongoPopulations = pongoPopulations.sort(function(a,b) {return a.Population - b.Population;}).slice(0, 150);

            scale = $K.scale.linear(pongoPopulations, key);
            colscale = chroma.scale(chroma.brewer.PiYG.slice().reverse());

            function symbolAttrs(d) {
               return {
                  r: Math.sqrt(scale(d[key]))*maxRad,
                  stroke: '#fff',
                  'stroke-width': scale(d[key])*1,
                  fill: colscale(scale(d[key])),
                  'fill-opacity': 0.5
               };
            }

            symbols = map.addSymbols({
               type: $K.Bubble,
               data: pongoPopulations,
               location: function(d) { return d.ll },
               attrs: symbolAttrs
            });
        });
*/

        /*
        updateSymbol = function(key) {
            var points = map.getLayer(key);
            var data = points.getPathsData();
            
            map.addSymbols({
                type: $K.Bubble,
                data: data,
                location: function(d) { return[d.cx, d.cy] },
                radius : function(d) { return Math.sqrt(d.population) * 0.001 },
                clustering: 'noverlap'
            });
        }
          
        */
     
        updateMap = function() {
            key = $(' .dataset.btn-primary').data('val');
            console.log("Key = " + key);
            if (currLayer != key && availableLayer.indexOf(key) != -1) {
                updateLayer(key);
            }
        }
    }, 1);
    
    $(' .btn').click(function(event) {
        var tgt = $(event.target), par = tgt.parent();
        $('.btn', par).removeClass('btn-primary');
        tgt.addClass('btn-primary');
        updateMap();
    });

});
