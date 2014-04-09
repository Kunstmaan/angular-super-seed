'use strict';

describe('Unit: Template URL Formatter', function () {

    var template;

    beforeEach(function() {
        module('app.common');

        inject(function(_template_) {
            template = _template_;
        });
    });

    describe('#call(index.html, test)', function() {

        var result;

        beforeEach(function() {
            result = template.formatUrl('index.html', 'test');
        });

        it('should return a fixed URL for a static template', function() {
            expect(result).to.equal('/js/test/views/index.html');
        });

    });

});

