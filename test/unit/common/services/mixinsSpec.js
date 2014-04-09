'use strict';

describe('Unit: Mixins service', function () {

    var mixins, $rootScope;

    beforeEach(function() {
        module('app.common', ['$provide', function($provide) {
            $provide.value('fooMixin', function(scope) {
                scope.foo = 'foo';
            });

            $provide.value('barMixin', function(scope) {
                scope.bar = 'bar';
            });
        }]);

        inject(['mixins', '$rootScope', function(_mixins, _$rootScope) {
            mixins = _mixins;
            $rootScope = _$rootScope;
        }]);
    });

    describe('when we have a scope', function() {

        var scope;

        beforeEach(function() {
            scope = $rootScope.$new();
        });

        describe('when we only specify one mixin without suffixing it', function() {

            beforeEach(function() {
                mixins(scope, 'foo');
            });

            it('should have added the mixin to the scope', function() {
                expect(scope.foo).to.equal('foo');
            });

        });

        describe('when we only specify one mixin with suffixing it', function() {

            beforeEach(function() {
                mixins(scope, 'fooMixin');
            });

            it('should have added the mixin to the scope', function() {
                expect(scope.foo).to.equal('foo');
            });

        });

        describe('when we only specify one mixin by providing a function', function() {

            beforeEach(function() {
                mixins(scope, function() {
                    return function(scope) {
                        scope.foo = 'foo';
                    };
                });
            });

            it('should have added the mixin to the scope', function() {
                expect(scope.foo).to.equal('foo');
            });

        });

        describe('when we specify multiple mixins', function() {

            beforeEach(function() {
                mixins(scope, ['foo', 'barMixin']);
            });

            it('should have added the mixin to the scope', function() {
                expect(scope.foo).to.equal('foo');
                expect(scope.bar).to.equal('bar');
            });

        });

        describe('when we specify multiple without array syntax', function() {

            beforeEach(function() {
                mixins(scope, 'foo', 'barMixin');
            });

            it('should have added the mixin to the scope', function() {
                expect(scope.foo).to.equal('foo');
                expect(scope.bar).to.equal('bar');
            });

        });

    });

});

