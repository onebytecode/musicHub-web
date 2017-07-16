module.exports  =  (users_controller, should, expect) => {
  describe('Users controller tests', () => {
    it('it should create user', done => {
      users_controller.create({
        _id: 1,
        naming: {
          fName: 'Kirill',
          sName: 'Perviy'
        }
      }, (err, user) => {
        if (err) console.log(err);
        expect(err).to.be.equal(null)
        user.should.be.a('object')
        expect(user.naming.fName).to.be.equal('Kirill')
        expect(user.naming.sName).to.be.equal('Perviy')
        done()
      })
    })
    it('it should get user', done => {
      users_controller.get({
        _id: 1
      }, (err, user) => {
        if (err) console.log(err);
        expect(err).to.be.equal(null)
        user._id.should.be.equal(1)
        expect(user.naming.fName).to.be.equal('Kirill')
        expect(user.naming.sName).to.be.equal('Perviy')
        done()
      })
    })
    it('it should update user', done => {
      users_controller.update({
        _id: 1,
        naming: {
          fName: 'Petr',
          sName: 'Perviy'
        }
      }, (err, user) => {
        expect(err).to.be.equal(null)
        user._id.should.be.equal(1)
        expect(user.naming.fName).to.be.equal('Petr')
        expect(user.naming.sName).to.be.equal('Perviy')
        done()
      })
    })
    it('it should delete user with id 1', done => {
      users_controller.delete({
        _id: 1
      }, (err, user) => {
        expect(err).to.be.equal(null)
        user._id.should.be.equal(1)
        done()
      })
    })
  })
}