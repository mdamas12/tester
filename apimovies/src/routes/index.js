const { Router } = require('express'); 
const user_routes = require('./userRoutes');
const movies_routes = require('./movieRoutes');
const movies_favorites_routes = require('./favoritesRoutes');

const router = Router(); 
router.get('/',(req,res) => res.send('Tester Prueba'));

//User Routes
router.use('/users', user_routes);
router.use('/movies', movies_routes);
router.use('/movies/favorites', movies_favorites_routes);

module.exports = router;
