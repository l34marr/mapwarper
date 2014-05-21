

//function used with osm mapnik tiles
function osm_getTileURL(bounds) {
    var res = this.map.getResolution();
    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        return this.url + z + "/" + x + "/" + y + "." + this.type;
    }
}
//use with
function get_tilesathome_osm_url (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit)
    {
        return null;
    }
    else
    {
        x = ((x % limit) + limit) % limit;
        var path = z + "/" + x + "/" + y + "." + this.type;
        var url = this.url;
        url="http://tah.openstreetmap.org/Tiles/tile/"
        if (url instanceof Array) {
            url = this.selectUrl(path, url);
        }
        return url + path;
    }
}

//from yychen
function get_smg_url (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        z = 17 - z;
        return this.url + z + "/" + x + "/IMG_" + x + "_" + y + "_" + z + "." + this.type;
    }
}

//from yychen
function get_tgm_url (bounds) {
    var res = this.map.getResolution();
    var x = Math.round ((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round ((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        return this.url + '&TileMatrix=' + z + '&TileCol=' + x + '&TileRow=' + y;
    }
}

var osma = new OpenLayers.Layer.TMS(
    "Osmarender",
    ["http://a.tah.openstreetmap.org/Tiles/tile/", "http://b.tah.openstreetmap.org/Tiles/tile/", "http://c.tah.openstreetmap.org/Tiles/tile/"],
    {
        type:'png',
        getURL: get_tilesathome_osm_url,
        displayOutsideMaxExtent: true
    }, {
        'buffer':1
    } );

var mapnik = new OpenLayers.Layer.TMS("OSM Mapnik", "http://tile.openstreetmap.org/", {
    type: 'png',
    getURL: osm_getTileURL,
    displayOutsideMaxExtent: true,
    transitionEffect: 'resize',
    attribution: '<a href="http://www.openstreetmap.org/">OpenStreetMap</a>'
});


var jpl_wms = new OpenLayers.Layer.WMS("NASA Landsat 7", "http://t1.hypercube.telascience.org/cgi-bin/landsat7", {
    layers: "landsat7"
});

var oamlayer = new OpenLayers.Layer.WMS( "OpenAerialMap",
   "http://openaerialmap.org/wms/",
   {layers: "world"}, { gutter: 15, buffer:0});

if(typeof(G_SATELLITE_MAP) !== 'undefined'){
  var googleSat = new OpenLayers.Layer.Google( "Google Satellite", {type: G_SATELLITE_MAP, 'sphericalMercator': true});
  var googleMaps = new OpenLayers.Layer.Google( "Google Streets", { 'sphericalMercator': true});
  var googleHybrid = new OpenLayers.Layer.Google("Google Hybrid", {type: G_HYBRID_MAP, 'sphericalMercator': true});
}

var sgmlayer = new OpenLayers.Layer.TMS("台灣堡圖", "http://gis.sinica.edu.tw/googlemap/JM20K_1904/", {
    type: 'jpg',
    getURL: get_smg_url,
    displayOutsideMaxExtent: true,
    transitionEffect: 'resize',
    /* attribution: '<a href="http://www.openstreetmap.org/">OpenStreetMap</a>'*/
});

var tgmlayer = new OpenLayers.Layer.TMS("通用版電子地圖", "http://maps.nlsc.gov.tw/S_Maps/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&FORMAT=image/png&STYLE=_null&LAYER=EMAP&TILEMATRIXSET=EPSG:3857", {
    type: 'png',
    getURL: get_tgm_url,
    displayOutsideMaxExtent: true,
    transitionEffect: 'resize',
    /* attribution: '<a href="http://www.openstreetmap.org/">OpenStreetMap</a>'*/
});

