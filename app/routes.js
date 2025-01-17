module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message : req.flash('loginMessage')});
    });

    // app.post('/login', do all our passport stuff here);

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message : req.flash('signupMessage')});
    });

    //app.post('/signup', do all our passport stuff here);

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', { user : req.user });
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        else res.redirect('/');
    }

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }))
}