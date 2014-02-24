'use strict';

var expect = require('chai').expect,
MapInitializer = require('../../app/scripts/map.js').initialize;

describe('Map tests', function(){

  var mapInitializer;

  beforeEach(function(){
    mapInitializer = new MapInitializer();
  });

  describe('initialMap', function(){
    it('map should be truthy (exists)', function(){
      expect(mapInitializer).to.be.ok;
    });

    //...

  });
});
