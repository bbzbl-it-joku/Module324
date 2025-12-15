# Changelog

## [1.3.1](https://github.com/bbzbl-it-joku/Module324/compare/v1.3.0...v1.3.1) (2025-12-15)


### Bug Fixes

* **ci:** Fix artifact download causing failing image ([9f2274d](https://github.com/bbzbl-it-joku/Module324/commit/9f2274de3b88b6e7a7593f65f15b54a865aea425))

## [1.3.0](https://github.com/bbzbl-it-joku/Module324/compare/v1.2.0...v1.3.0) (2025-12-15)


### Features

* **kamal:** Create AWS Deployment Pipeline ([2fa6a8f](https://github.com/bbzbl-it-joku/Module324/commit/2fa6a8fa4a3f61cee14f0d7ed1b9c8a9a83d0e73))
* **kamal:** Implement Kamal Deployment ([aea0d1b](https://github.com/bbzbl-it-joku/Module324/commit/aea0d1b34f2154e3f7ee5d66eecbcf6edcfc8eab))


### Bug Fixes

* **kamal:** Add missing ENV Secret ([1eda20e](https://github.com/bbzbl-it-joku/Module324/commit/1eda20e2d92e867d5d7a343ff741f0200f7c60d8))

## [1.2.0](https://github.com/bbzbl-it-joku/Module324/compare/v1.1.0...v1.2.0) (2025-12-08)


### Features

* **backend:** Add demo data service for development environment ([ad79b5d](https://github.com/bbzbl-it-joku/Module324/commit/ad79b5d369a333baca0cbeab1690e997f6b04694))
* **backend:** Added difficulty ([613c3cc](https://github.com/bbzbl-it-joku/Module324/commit/613c3cc5498142551ef72d01313514ebc1d3f713))
* **frontend:** Add local leaderboard component to display game scores ([a58a077](https://github.com/bbzbl-it-joku/Module324/commit/a58a077f3ff509fa7aea302d3d62911b668c13d5))
* **frontend:** Add tests for game logic, components, and hooks ([21668f2](https://github.com/bbzbl-it-joku/Module324/commit/21668f29998f463d6e34bfcf8777fc6f77928977))
* **frontend:** Enhance game experience with leaderboard, player name dialog, and win dialog ([3207666](https://github.com/bbzbl-it-joku/Module324/commit/3207666334e4013c75458d2f37f671a800b854e6))
* **frontend:** Enhance leaderboard and player name handling with validation and score tracking ([a59df41](https://github.com/bbzbl-it-joku/Module324/commit/a59df41a24438bf0ecadedcd0a23a401444079a3))
* **frontend:** Implement leaderboard API integration and async score handling ([fe5a9a7](https://github.com/bbzbl-it-joku/Module324/commit/fe5a9a7fcaa9f5df413ec48a34225ccfc52ccfd8))
* **frontend:** Implement local dummy WinDialog component to display winning message and score ([e2c9ea3](https://github.com/bbzbl-it-joku/Module324/commit/e2c9ea3238b31a631e879faf328d3db85e2f9900))
* **frontend:** Refine game end state handling and leaderboard score updates ([61e382e](https://github.com/bbzbl-it-joku/Module324/commit/61e382e3c40973ce7785b431399cf4917631c712))
* **terraform:** Implement AWS infrastructure setup with Terraform scripts and actions ([ee0e20b](https://github.com/bbzbl-it-joku/Module324/commit/ee0e20bdf000b834fdafe320f9eb6e5c685fdb00))


### Bug Fixes

* **backend:** Added default value for difficulty ([fc8be3d](https://github.com/bbzbl-it-joku/Module324/commit/fc8be3d38c8ceb133eb516c391d02494501d8d1a))
* **ci:** Rename Jar before adding to release ([bf61eb6](https://github.com/bbzbl-it-joku/Module324/commit/bf61eb6d7c172c707b494a77ee6ca93178d59cad))
* **frontend:** Add package-lock.json ([8a1212c](https://github.com/bbzbl-it-joku/Module324/commit/8a1212cf968a00044117947b21ab5ae9d58fb2aa))
* **frontend:** Fix lint and build ([fc021e7](https://github.com/bbzbl-it-joku/Module324/commit/fc021e758de2634b4eaad699db70c664fe338bdd))
* **frontend:** run eslint and prettier ([49174ca](https://github.com/bbzbl-it-joku/Module324/commit/49174cadd98c088159d81d32248670d6b9dc4516))

## [1.1.0](https://github.com/bbzbl-it-joku/Module324/compare/v1.0.0...v1.1.0) (2025-12-01)


### Features

* **backend:** Added health check ([6e8add1](https://github.com/bbzbl-it-joku/Module324/commit/6e8add1d466625b2de1a55415285e0d97c43738f))
* **ci:** add build step to backend ci ([44e6e48](https://github.com/bbzbl-it-joku/Module324/commit/44e6e486528a0fb7d4379a0dbe2d887a1f746bf4))
* **ci:** add build step to frontend ci ([4d52bf4](https://github.com/bbzbl-it-joku/Module324/commit/4d52bf465bf1a737bfb60e980b4c020cbe52849b))
* **ci:** Add ci step to build and deploy docker image ([2a47735](https://github.com/bbzbl-it-joku/Module324/commit/2a4773586db58a9641234aa071e330f3991dda8f))
* **ci:** Add ci to rebundle jar ([1822a80](https://github.com/bbzbl-it-joku/Module324/commit/1822a80c49e6d7c184b92b4200237057865b6d9d))
* **ci:** Add Jar as asset to Release ([0852b28](https://github.com/bbzbl-it-joku/Module324/commit/0852b285f1ebb7d1c5b65933505686601de07933))
* **ci:** Add Tests to frontend ci ([05ad160](https://github.com/bbzbl-it-joku/Module324/commit/05ad160c1567753d627b69a9652dfaac2df39a02))
* **ci:** Create Docker File for bundled app ([042bd65](https://github.com/bbzbl-it-joku/Module324/commit/042bd65a18ba4c2213d90b1afce7d3dffcd80f72))
* **ci:** Implement Main CI Pipeline ([7369e5a](https://github.com/bbzbl-it-joku/Module324/commit/7369e5a0f3aa0447d606cbfd3ee0e47707d8cd44))
* **ci:** Recreate backend ci with lint step ([6c19964](https://github.com/bbzbl-it-joku/Module324/commit/6c1996429bd6892bd017fae9686ef26739c0964e))
* **ci:** Recreate Frontend pipline with lint step ([d4df701](https://github.com/bbzbl-it-joku/Module324/commit/d4df701bcb7c2a62d92d0ffcfe9f877f31dec930))
* **docker:** Add docker test and dev setup ([68f2b0a](https://github.com/bbzbl-it-joku/Module324/commit/68f2b0a3beb46d090120b54be7baf6923c4d2a5b))
* **frontend:** Add difficulty switcher, game configurations and game board ([704bd6b](https://github.com/bbzbl-it-joku/Module324/commit/704bd6b7f4be3fd559423325f1c36b14fc13223d))
* **frontend:** Add score, fruits and golden fruits ([f4f2eba](https://github.com/bbzbl-it-joku/Module324/commit/f4f2eba5743a9b86e92174e80635edb661cda544))
* **frontend:** Added vitest and an example test for the footer ([4152083](https://github.com/bbzbl-it-joku/Module324/commit/41520832501eb24f555bfb0e35b89bd3fa7c230d))
* **frontend:** Implement snake movement ([16f8750](https://github.com/bbzbl-it-joku/Module324/commit/16f87500a172e7b08e4e578e98b55119824449ff))
* **frontend:** Refactor Footer component ([028205e](https://github.com/bbzbl-it-joku/Module324/commit/028205efb8ce57cd9ae7793b805300c7d84f3bc4))
* **frontend:** Update GameControls and GameStatus to include gameOver and gameWon states ([e39ff26](https://github.com/bbzbl-it-joku/Module324/commit/e39ff261732c2ab2f8bd55e27bb732a383c06342))


### Bug Fixes

* **backend:** Added @GeneratedValue ([7301da2](https://github.com/bbzbl-it-joku/Module324/commit/7301da282080fc94b13f4ac1891fe64d28a1de75))
* **backend:** Fix Spotless Rules and apply them ([15697e6](https://github.com/bbzbl-it-joku/Module324/commit/15697e6208d335b7382062342a0ac427f0ebfeb5))
* **backend:** Formatting ([c9eadd8](https://github.com/bbzbl-it-joku/Module324/commit/c9eadd82570d02c98fe7cd5f1e0daee5b7f7a3eb))
* **backend:** Make POM and App Config prod ready ([d4f2484](https://github.com/bbzbl-it-joku/Module324/commit/d4f248428adc5d1153b888c9095a1fd0db900b9e))
* **ci:** add Cache step for java dependencies ([a50ce4b](https://github.com/bbzbl-it-joku/Module324/commit/a50ce4b4a2a26f1c8f1f2709d806cec1301fbc29))
* **ci:** cleanup old pipelines ([d5099a0](https://github.com/bbzbl-it-joku/Module324/commit/d5099a06d7d0a965849bbdc0b895cd0985557fdd))
* **ci:** Fix frontend artifact name ([985beaa](https://github.com/bbzbl-it-joku/Module324/commit/985beaa02a140ae9408c8b9f3889089a5bba0629))
* **ci:** Fix Frontend Test Execution ([b202f25](https://github.com/bbzbl-it-joku/Module324/commit/b202f25c29fed7363a53ca0ecaed5d47e10544ef))
* **editorconfig:** Add xml to editorconfig ([5105db5](https://github.com/bbzbl-it-joku/Module324/commit/5105db595c14c9f9af91c944210fa4f0dde3ed39))
* Fix rebundled JAR not serving static files correctly ([7f1bae6](https://github.com/bbzbl-it-joku/Module324/commit/7f1bae601efa10d9c146e8b0ee1aa29f5465ba4a))

## 1.0.0 (2025-11-24)


### Features

* Added .editorconfig ([20ca118](https://github.com/bbzbl-it-joku/Module324/commit/20ca11815724d409f8dcb0877eebc65227343385))
* **api:** Create migration for leaderboard entity ([5ea8c87](https://github.com/bbzbl-it-joku/Module324/commit/5ea8c87a8762ee5fcdd484b8b38610a985c9e0fd))
* **backend:** Add flyway dependency and configure application ([8a1bdbd](https://github.com/bbzbl-it-joku/Module324/commit/8a1bdbd050c3dcf0a007aa97dadb49849fee2abc))
* **backend:** Added controller and service ([614526f](https://github.com/bbzbl-it-joku/Module324/commit/614526f916e969e7ddf17848a07835f0137ff8f9))
* **backend:** Added DTO ([6e300cf](https://github.com/bbzbl-it-joku/Module324/commit/6e300cfa1f6aeda8ed66b6e8f36549f3daa4ddb6))
* **backend:** Added repository and entity for Leaderboard Added ([4abfda1](https://github.com/bbzbl-it-joku/Module324/commit/4abfda1076188cc01846c8d386830c14970d55a0))
* **backend:** Setup backend with Quarkus ([606912f](https://github.com/bbzbl-it-joku/Module324/commit/606912f28498e61b09fcc7aef9dd5b524029a681))
* **ci:** Add GitHub Actions workflow for automated releases ([e9cddd0](https://github.com/bbzbl-it-joku/Module324/commit/e9cddd0b3903fbc5949e011e418016e5526cae78))
* **ci:** Backend linting pipeline ([40c543f](https://github.com/bbzbl-it-joku/Module324/commit/40c543f605ebd043d512f3401d8880687a83e1e4))
* **ci:** Frontend linting pipeline ([01775d7](https://github.com/bbzbl-it-joku/Module324/commit/01775d70f590f01f46e9bac4c5621d86dd2e9ecd))
* **frontend:** Add routing with Home and NotFound pages, and implement Footer component ([ef940e3](https://github.com/bbzbl-it-joku/Module324/commit/ef940e35505d921f4c13f1ffaf0ae41e9cb01e08))
* **frontend:** Initialize frontend with Vite and React setup ([892621d](https://github.com/bbzbl-it-joku/Module324/commit/892621df2c6438d14f8931b36b892eba14538966))
* **lint:** Add spotless as linter ([ee8db47](https://github.com/bbzbl-it-joku/Module324/commit/ee8db47c1baa25fe141e9838d94bcdf5eb9ef9d6))


### Bug Fixes

* **backend:** Add column annotation so orm can detect db correctly ([c240561](https://github.com/bbzbl-it-joku/Module324/commit/c2405617ea994dcf7f5967d64ef09e3174748cdb))
* **backend:** Add missing dependencies to pom ([81e3584](https://github.com/bbzbl-it-joku/Module324/commit/81e3584a96b25f9062d38c1c1468a91bf87a8a02))
* **backend:** Cleanup deprecated properties and make config prod ready ([6afbe67](https://github.com/bbzbl-it-joku/Module324/commit/6afbe67db6bbe874d5e510dada1cccc7d18f92cc))
* **ci:** fix maven cache in backend lint pipeline ([b51c89f](https://github.com/bbzbl-it-joku/Module324/commit/b51c89fbd4a53ee3a8b1aca80ae8cfd1cc55d7f3))
* **docs:** Update Backend readme with getting started instructions ([7a88b27](https://github.com/bbzbl-it-joku/Module324/commit/7a88b27a3ec604002603cd9c2bd4794fb204b6f8))
* **docs:** Update README to correct language and add frontend README ([d35e3ba](https://github.com/bbzbl-it-joku/Module324/commit/d35e3bab8f5ab0ff7c18843c0b42591efe985166))
