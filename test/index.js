const Metalsmith = require('metalsmith');
const scopedAttributes = require('../src');
const should = require('should');

describe('metalsmith-scoped-attributes', function () {

    it('should scope document attributes to a namespace', function (done) {
        Metalsmith('test/fixtures')
            .clean(true)
            .destination('expected')
            .use(scopedAttributes())
            .build(function (err, files) {
                files['index.html'].should.have.propertyByPath('page', 'title');
                done();
            });
    });

    it('should remove scoped attributes from the global namespace', function (done) {
        Metalsmith('test/fixtures')
            .clean(true)
            .destination('expected')
            .use(scopedAttributes())
            .build(function (err, files) {
                files['index.html'].should.not.have.property('title');
                done();
            });
    });

    it('should change the namespace if `name` option is passed', function (done) {
        Metalsmith('test/fixtures')
            .clean(true)
            .destination('expected')
            .use(scopedAttributes({
                name: 'this'
            }))
            .build(function (err, files) {
                files['index.html'].should.have.propertyByPath('this', 'title');
                done();
            });
    });

    it('should not namespace excluded attributes', function (done) {
        Metalsmith('test/fixtures')
            .clean(true)
            .destination('expected')
            .use(scopedAttributes({
                exclude: ['title']
            }))
            .build(function (err, files) {
                files['index.html'].should.not.have.propertyByPath('page', 'title');
                done();
            });
    });

    it('should not namespace internal Metalsmith attributes', function (done) {
        Metalsmith('test/fixtures')
            .clean(true)
            .destination('expected')
            .use(scopedAttributes())
            .build(function (err, files) {
                files['index.html']['page'].should.not.have.properties(['mode', 'stats']);
                done();
            });
    });

});