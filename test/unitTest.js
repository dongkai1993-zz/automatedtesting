if (typeof require != "undefined") {
    var assert = require('chai').assert;
    var Wilddog = require('wilddog');
    // if (typeof __webpack_require__ != "undefined") {
    //     var Wilddog = require("../../dist/lib/wilddog-web.js")
    // } else {
    //     var Wilddog = require("../../dist/lib/wilddog-node.js")
    // }
}

describe('API', function() {
    this.timeout(20000);
    describe('basic', function() {
        it('new a wildodg()', function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com');
            assert.isNotNull(ref);
        });
        it('child()', function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com');
            assert.equal(ref.child('a/b/c').toString(), ref.child('a').child('b').child('c').toString());
        });
        it('parent()', function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com/a/b/c');
            assert.equal(ref.parent().toString(), 'https://dongkai.wilddogio.com/a/b');
        })
        it('root()', function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com/a/b/c');
            assert.equal(ref.root().toString(), 'https://dongkai.wilddogio.com/');
        });
        it('key()', function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com/a/b/c');
            assert.equal(ref.key().toString(), 'c');
        });
        it('toString()', function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com/a/b/c');
            assert.equal(ref.root().toString(), 'https://dongkai.wilddogio.com/');
        });
        // it('goOffline()', function(done) {
        //     var ref = new Wilddog('https://dongkai.wilddogio.com/test');
        //     ref.set(44521, function(err) {
        //         assert.isNull(err);
        //         ref.once('value', function(sn) {
        //             assert.equal(sn.val(), 44521);
        //             Wilddog.goOffline();
        //             done();

        //         })
        //     });
        // });

        after(function() {
            Wilddog.goOnline();
        });

    });

    describe('acountManager', function() {
        describe('', function() {
            it('createUser()', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                ref.createUser({
                        email: 'createUser@ac.branch',
                        password: '123456'
                    },
                    function(err, data) {
                        assert.isNull(err);
                        ref.authWithPassword({
                                email: 'createUser@ac.branch',
                                password: '123456'
                            },
                            function(err, data) {
                                assert.isNull(err);
                                ref.unauth();
                                done();
                            });
                    });
            })
        })
        describe('', function() {
            it('changePassword()', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                ref.createUser({
                        email: 'changePassword@ac.branch',
                        password: '123456'
                    },
                    function(err, data) {
                        assert.isNull(err);
                        ref.changePassword({
                                email: 'changePassword@ac.branch',
                                oldPassword: '123456',
                                newPassword: '123456789'
                            },
                            function(err) {
                                assert.isNull(err);
                                ref.authWithPassword({
                                        email: 'changePassword@ac.branch',
                                        password: '123456789'
                                    },
                                    function(err, data) {
                                        assert.isNull(err);
                                        ref.unauth();
                                        done();
                                    })
                            })

                    });
            })
        })
        describe('', function() {
            it('changeEmail()', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                ref.createUser({
                        email: 'changeEmail@ac.branch',
                        password: '123456'
                    },
                    function(err, data) {
                        assert.isNull(err);
                        ref.changeEmail({
                                oldEmail: 'changeEmail@ac.branch',
                                newEmail: 'newEmail@ac.branch',
                                password: '123456'
                            },
                            function(err) {
                                assert.isNull(err);
                                ref.authWithPassword({
                                        email: 'newEmail@ac.branch',
                                        password: '123456'
                                    },
                                    function(err, data) {
                                        assert.isNull(err);
                                        ref.unauth();
                                        done();
                                    })
                            })

                    });
            })
        })
        describe('', function() {
            it('removeUser()', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                ref.createUser({
                        email: 'removeUser@ac.branch',
                        password: '123456'
                    },
                    function(err, data) {
                        assert.isNull(err);
                        ref.removeUser({
                                email: 'removeUser@ac.branch',
                                password: '123456'
                            },
                            function(err) {
                                assert.isNull(err);
                                ref.authWithPassword({
                                        email: 'removeUser@ac.branch',
                                        password: '123456'
                                    },
                                    function(err, data) {
                                        assert.isNotNull(err);
                                        done();
                                    })
                            })

                    });
            })
        })

        // it('resetPassword()',function(done){
        //     var ref = new Wilddog('https://dongkai.wilddogio.com');
        //     ref.createUser({email:'dongkai@wilddog.com',password:'123456'},
        //         function(err,data){
        //             assert.isNull(err);
        //             ref.resetPassword({email:'dongkai@wilddog.com'},
        //                 function(err){
        //                     assert.isNull(err);
        //                     done()
        //                 });

        //         });
        // });

        after(function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com');
            ref.removeUser({
                email: 'createUser@ac.branch',
                password: '123456'
            }, function(err) {});
            ref.removeUser({
                email: 'changePassword@ac.branch',
                password: '123456789'
            }, function(err) {});
            ref.removeUser({
                email: 'newEmail@ac.branch',
                password: '123456'
            }, function(err) {});
            ref.removeUser({
                email: 'removeUser@ac.branch',
                password: '123456'
            }, function(err) {});
            ref.removeUser({
                email: 'dongkai@willdog.com',
                password: '123456'
            }, function(err) {});

        });
    });
    describe('auth', function() {
        describe('', function() {
            it('authWithCustomToken(token)', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2IjowLCJpYXQiOjE0OTk5OTk5OTksImQiOnsidWlkIjoic2ltcGxlbG9naW46MTQ1Mjc2MzE2OTc2MTU4NiIsInByb3ZpZGVyIjoicGFzc3dvcmQifX0.el8vvz_7RPizoPlfzlauKRyTwnOnNPdfUntEvQeyIzA';
                ref.authWithCustomToken(token, function(err) {
                    assert.isNull(err);
                    assert.equal(ref.getAuth().token, token);
                    ref.unauth();
                    done();
                })

            });
        });
        describe('', function() {
            it('authWithCustomToken(secretKey)', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                var secretKey = 'ApfLnHCYekm3oo2FTix2ywFwxDWwYvWWs8fKulfZ';
                ref.authWithCustomToken(secretKey, function(err) {
                    assert.isNull(err);
                    assert.equal(ref.getAuth().token, secretKey);
                    ref.unauth();
                    done();
                })

            });
        });
        describe('', function() {
            it('authAnonymously()', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                ref.authAnonymously(
                    function(err, auth) {
                        assert.isNull(err);
                        assert.isNotNull(ref.getAuth());
                        ref.unauth();
                        done();
                    });
            });
        });
        describe('', function() {
            it('authWithPassword()', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                ref.authWithPassword({
                    email: 'dongkai@wilddog.com',
                    password: '123456'
                }, function(err, data) {
                    assert.isNull(err);
                    assert.equal(ref.getAuth().password.email, 'dongkai@wilddog.com');
                    ref.unauth();
                    done();
                });

            });
        });
        describe('', function() {
            it('authWithOAuthPopup()', function() {
                var ref = new Wilddog('https://dongkai.wilddogio.com');

            });
        });
        describe('', function() {
            it('authWithOAuthRedirect()', function() {
                var ref = new Wilddog('https://dongkai.wilddogio.com');

            });
        });
        describe('', function() {
            it('getAuth()', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                var emailStr = 'dongkai@wilddog.com'
                ref.authWithPassword({
                    email: emailStr,
                    password: '123456'
                }, function(err) {
                    assert.isNull(err);
                    assert.equal(ref.getAuth().password.email, emailStr);
                    ref.unauth();
                    done();
                });
            });
        });
        describe('', function() {
            it('authWithOAuthToken()', function() {
                var ref = new Wilddog('https://dongkai.wilddogio.com');

            });

        });
        describe('', function() {
            it('onAuth()', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                var state = 0;
                var callback = function(authData) {
                    ++state;
                    if (state == 1) {
                        assert.isNull(authData);
                    } else if (state == 2) {
                        assert.equal(authData.password.email, 'dongkai@wilddog.com')
                    } else if (state == 3) {
                        assert.isNull(authData)
                    }
                }
                var onAuth = new Promise(function(resolve, reject) {

                    ref.onAuth(callback);
                    resolve();
                })
                var authWithPassword = function() {

                    return new Promise(function(resolve, reject) {


                        ref.authWithPassword({ email: 'dongkai@wilddog.com', password: '123456' }, function(err) {
                            if (err) {
                                reject(err)
                            } else {
                                resolve();
                            }

                        })
                    })
                }
                var unauth = function() {
                    return new Promise(function(resolve, reject) {

                        ref.unauth();
                        ref.offAuth(callback);
                        resolve();
                        done();
                    })
                }
                onAuth
                    .then(authWithPassword)
                    .then(unauth);

            });
        });

        describe('', function() {
            it('offAuth()', function(done) {
                var state = 0;
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                var callback = function(authData) {
                    state++;
                }
                ref.onAuth(callback);
                ref.offAuth(callback);
                ref.authWithPassword({
                        email: 'dongkai@wilddog.com',
                        password: '123456'
                    },
                    function(err) {
                        assert.isNull(err);
                        assert.equal(state, 1);
                        done();
                    })
            });
        });

        describe('', function() {
            it('unauth()', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com');
                ref.authWithPassword({
                        email: 'dongkai@wilddog.com',
                        password: '123456'
                    },
                    function(err) {
                        assert.isNull(err);
                        assert.isNotNull(ref.getAuth());
                        ref.unauth();
                        assert.isNull(ref.getAuth());
                        done();
                    })

            });
        });
    });

    describe('set()', function() {

        it('set(Number)', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/set/number');
            var number = 46461345612;
            ref.set(number, function(err) {
                assert.isNull(err);
                ref.once('value', function(snap) {
                    assert.equal(snap.val(), number);
                    done();
                });

            });

        });

        it('set(String)', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/set/String');
            var value = '23sdsdfw#EWwerwefsdfsdf234fsfdsSSSSSd';
            ref.set(value, function(err) {
                assert.isNull(err);
                ref.once('value', function(snap) {
                    assert.equal(snap.val(), value);
                    done();
                });
            });
        });

        it('set(Object)', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/set/Object');
            var value = {
                "name": "test",
                "id": 132213
            };
            ref.set(value, function(err) {
                assert.isNull(err);
                ref.once('value', function(snap) {
                    assert.equal(snap.val().name, value.name);
                    assert.equal(snap.val().id, value.id);
                    done();
                });
            });
        });

        it('set(boolean)', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/set/boolean');
            var value = true;
            ref.set(value, function(err) {
                assert.isNull(err);
                ref.once('value', function(snap) {
                    assert.equal(snap.val(), true);
                    done();
                });
            });
        });

        it('set(null)', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/set/null');
            var value = null;
            ref.set(value, function(err) {
                assert.isNull(err);
                ref.once('value', function(snap) {
                    assert.equal(snap.val(), value);
                    done();
                });
            });
        });
        after(function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com/set');
            ref.remove();
        });
    });

    describe('setPriority()', function() {
        it('setPriority()', function(done) {
            var refSetPriority = new Wilddog('https://dongkai.wilddogio.com/setPriority');
            var refNoPriority = new Wilddog('https://dongkai.wilddogio.com/setPriority/noPriority/');
            var refMinNum = new Wilddog('https://dongkai.wilddogio.com/setPriority/numMinPriority');
            var refMaxNum = new Wilddog('https://dongkai.wilddogio.com/setPriority/numMaxPriority');
            var refMinString = new Wilddog('https://dongkai.wilddogio.com/setPriority/minStringPriority');
            var refMaxString = new Wilddog('https://dongkai.wilddogio.com/setPriority/maxStringPriority');
            var i = -1;
            var count = 0;
            var setValues = function(ref, value) {
                return new Promise(function(resolve, reject) {
                    ref.set(value, function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    })
                })
            }
            var setPriorities = function(ref, value) {
                return new Promise(function(resolve, reject) {
                    ref.setPriority(value, function(err) {
                        if (err) {
                            reject(err);
                        } else {
                            setTimeout(function() {
                                resolve();
                            }, 1000);
                        }
                    })
                })
            }

            Promise.all([
                setValues(refMinString, 3),
                setValues(refMaxString, 4),
                setValues(refNoPriority, 0),
                setValues(refMaxNum, 2),
                setValues(refMinNum, 1),
                setPriorities(refMinString, 'aaa'),
                setPriorities(refMaxString, 'abcd'),
                setPriorities(refMinNum, 1),
                setPriorities(refMaxNum, 2)
            ]).then(function() {

                refSetPriority.once("value", function(snapshot) {
                    snapshot.forEach(function(snap) {
                        assert(i < snap.val());
                        i = snap.val();
                    });
                    done();
                });
            }, function(err) {

            })
        });
        after(function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com/setPriority');
            ref.remove();
        });
    });

    describe('setWithPriority()', function() {
        it('setWithPriority(Object)', function(done) {
            var refSetWithPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority");
            var refMaxPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority/maxPriority");
            var refMinPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority/minPriority");
            var valueMax = {
                'id': '1'
            };
            var valueMin = {
                'id': '2'
            };
            var count = 0;
            var i = 3;

            refMaxPriority.setWithPriority(valueMin, 1, isFinished());
            refMinPriority.setWithPriority(valueMax, 2, isFinished());

            function isFinished() {
                count += 1;
                if (count == 2) {
                    refSetWithPriority.once('value', function(snapshot) {
                        snapshot.forEach(function(snap) {
                            assert(i > snap.val().id);
                            i = snap.val().id;
                        });
                        done();
                    });
                };
            };
        });

        it('setWithPriority(String)', function(done) {
            var refSetWithPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority");
            var refMaxPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority/maxPriority");
            var refMinPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority/minPriority");
            var valueMax = 'sadasf5453a4das1';
            var valueMin = 'sadasf5453a4das2';
            var count = 0;
            var i = 'sadasf5453a4das3';

            refMaxPriority.setWithPriority(valueMin, 1, isFinished());
            refMinPriority.setWithPriority(valueMax, 2, isFinished());

            function isFinished() {
                count += 1;
                if (count == 2) {
                    refSetWithPriority.once('value', function(snapshot) {
                        snapshot.forEach(function(snap) {
                            assert(i > snap.val());
                            i = snap.val();
                        });
                        done();
                    });
                };
            };
        });

        it('setWithPriority(Number)', function(done) {
            var refSetWithPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority");
            var refMaxPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority/maxPriority");
            var refMinPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority/minPriority");
            var valueMax = 31314514444;
            var valueMin = 313145144442;
            var count = 0;
            var i = 313145144443;

            refMaxPriority.setWithPriority(valueMin, 1, isFinished());
            refMinPriority.setWithPriority(valueMax, 2, isFinished());

            function isFinished() {
                count += 1;
                if (count == 2) {
                    refSetWithPriority.once('value', function(snapshot) {
                        snapshot.forEach(function(snap) {
                            assert(i > snap.val());
                            i = snap.val();
                        });
                        done();
                    });
                };
            };
        });

        it('setWithPriority(Boolean)', function(done) {
            var refSetWithPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority");
            var refMaxPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority/maxPriority");
            var refMinPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority/minPriority");
            var valueMax = true;
            var valueMin = false;
            var count = 0;
            var i = false;

            refMaxPriority.setWithPriority(valueMax, 2, isFinished());
            refMinPriority.setWithPriority(valueMin, 1, isFinished());

            function isFinished() {
                ++count;
                if (count == 2) {
                    refSetWithPriority.once('value', function(snapshot) {
                        snapshot.forEach(function(snap) {
                            assert.equal(snap.val(), i);
                            i = true;
                        });
                        done();
                    });
                };
            };
        });

        it('setWithPriority(Null)', function(done) {
            var refSetWithPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority");
            var refMaxPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority/maxPriority");
            var refMinPriority = new Wilddog("https://dongkai.wilddogio.com/setWithPriority/minPriority");
            var valueMax = {
                'id': '1'
            };
            var valueMin = {
                'id': '2'
            };
            var count = 0;
            var i = 3;

            refMaxPriority.setWithPriority(valueMin, 1, isFinished());
            refMinPriority.setWithPriority(valueMax, 2, isFinished());

            function isFinished() {
                count += 1;
                if (count == 2) {
                    refSetWithPriority.once('value', function(snapshot) {
                        snapshot.forEach(function(snap) {
                            assert(i > snap.val().id);
                            i = snap.val().id;
                        });
                        done();
                    });
                };
            };
        });
        after(function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com/setWithPriority');
            ref.remove();
        });
    });

    describe('update()', function() {
        it('update()', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/update');
            ref.set({
                "a": true,
                "b": false
            });
            ref.update({
                "a": false,
                "c": true
            }, function(err) {
                assert.isNull(err);
                ref.once("value", function(snap) {
                    assert.equal(snap.val().a, false);
                    assert.equal(snap.val().b, false);
                    assert.equal(snap.val().c, true);
                    done();
                });
            });
        });
        after(function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com/update');
            ref.remove();
        });
    });

    describe('remove()', function() {
        it('remove()', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/remove');
            ref.set(true);
            ref.remove(function(err) {
                assert.isNull(err);
                ref.once("value", function(snap) {
                    assert.equal(snap.val(), null);
                    done();
                });
            });
        });
    });

    describe('push()', function() {
        it('push(Object)', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/push');
            var value = {
                "name": "test",
                "id": 132213
            };
            var childRef = ref.push(value, function(err) {
                assert.isNull(err);
                var newKey = childRef.key();
                ref.child(newKey).once("value", function(snap) {
                    assert.equal(snap.val().name, value.name);
                    assert.equal(snap.val().id, value.id);
                    done();
                });
            });
        });


        it('push(String)', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/push');
            var value = "sadsadsa253d13sa21d";
            var childRef = ref.push(value, function(err) {
                assert.isNull(err);
                var newKey = childRef.key();
                ref.child(newKey).once("value", function(snap) {
                    assert.equal(snap.val(), value);
                    done();
                });
            });
        });

        it('push(Number)', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/push');
            var value = Math.random();
            var childRef = ref.push(value, function(err) {
                assert.isNull(err);
                var newKey = childRef.key();
                ref.child(newKey).once("value", function(snap) {
                    assert.equal(snap.val(), value);
                    done();
                });
            });
        });

        it('push(Boolean)', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/push');
            var value = false;
            var childRef = ref.push(value, function(err) {
                assert.isNull(err);
                var newKey = childRef.key();
                ref.child(newKey).once("value", function(snap) {
                    assert.equal(snap.val(), value);
                    done();
                });
            });
        });

        it('push(null)', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/push');
            var value = null;
            var childRef = ref.push(value)
            assert.isNotNull(childRef.key());
            done();

        });

        after(function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com/push');
            ref.remove();
        });
    });

    describe('transaction()', function() {
        it('transaction()', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com/transaction');
            ref.set({
                'name': 'test'
            });
            ref.transaction(function(currentData) {
                if (currentData.name === 'test') {
                    return {
                        'name': 'transaction'
                    };
                };
            }, function(err) {
                assert.isNull(err);
                ref.once('value', function(snap) {
                    assert.equal(snap.val().name, 'transaction');
                    done();
                });
            });
        });

        after(function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com/transaction');
            ref.remove();
        });

    });

    describe('Query(Methods)', function() {
        var ref = new Wilddog('https://dongkai.wilddogio.com/Query');
        ref.set({
            'men': {
                'faf': 5445,
                'dsa': 42545,
                'weq': 2725,
                '24ds': 'wadd'
            },
            'women': {
                'vzx': 3542,
                'dsa': 213
            }
        });
        var valueState = 0;
        var child_addedState = 0;
        var child_changedState = 0;
        var child_removedState = 0;
        describe('', function() {
            it('on()', function(done) {

                var ref = new Wilddog('https://dongkai.wilddogio.com/Query/men');
                var onSet = new Promise(function(resolve, reject) {
                    ref.on('child_added', function() {
                        ++child_addedState;
                    });
                    ref.on('child_changed', function() {
                        ++child_changedState;
                    });
                    ref.on('child_removed', function() {
                        ++child_removedState;
                    });
                    ref.on('value', function(data) {
                        ++valueState;
                    });
                    resolve();
                })

                var dataTest = function() {
                    return new Promise(function(resolve, reject) {
                        ref.set({
                            'test': 32132
                        }, function(err) {
                            assert.isNull(err);
                            ref.set({
                                'test': 42424
                            }, function(err) {
                                assert.isNull(err);
                                ref.remove(function(err) {
                                    assert.isNull(err);
                                    resolve();
                                })
                            })
                        })
                    })
                }

                onSet
                    .then(dataTest)
                    .then(setTimeout(function() {
                        assert.equal(valueState, 3);
                        assert.equal(child_addedState, 1);
                        assert.equal(child_changedState, 1);
                        assert.equal(child_removedState, 1);
                        done();
                    }, 1000))

            });

            after(function() {
                var ref = new Wilddog('https://dongkai.wilddogio.com/Query/men');
                ref.off('child_added');
                ref.off('child_changed');
                ref.off('child_removed');
                ref.off('value');

            })
        })

        describe('', function() {
            it('once()', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com/Query/men');
                var onceSet = new Promise(function(resolve, reject) {
                    ref.once('child_added', function() {
                        ++child_addedState;
                    });
                    ref.once('child_changed', function() {
                        ++child_changedState;
                    });
                    ref.once('child_removed', function() {
                        ++child_removedState;
                    });
                    ref.once('value', function(data) {
                        ++valueState;
                    });
                    resolve();
                })
                var dataTest = function() {
                    return new Promise(function(resolve, reject) {
                        ref.set({
                            'test': 32132
                        }, function(err) {
                            assert.isNull(err);
                            ref.set({
                                'test': 42424
                            }, function(err) {
                                assert.isNull(err);
                                ref.remove(function(err) {
                                    assert.isNull(err);
                                    assert.equal(valueState, 4);
                                    assert.equal(child_addedState, 2);
                                    assert.equal(child_changedState, 2);
                                    assert.equal(child_removedState, 2);
                                    resolve();
                                    done();
                                })
                            })
                        })
                    })
                }
                onceSet.then(dataTest);
            })
        })

        describe('', function() {
            it('off()', function(done) {
                var ref = new Wilddog('https://dongkai.wilddogio.com/Query');
                ref.set({
                        'men': {
                            'faf': 5445,
                            'dsa': 42545,
                            'weq': 2725,
                            '24ds': 'wadd'
                        },
                        'women': {
                            'vzx': 3542,
                            'dsa': 213
                        }
                    },
                    function(err) {
                        assert.isNull(err);
                        assert.equal(valueState, 4);
                        assert.equal(child_addedState, 2);
                        assert.equal(child_changedState, 2);
                        assert.equal(child_removedState, 2);
                        done();
                    });

            })
        })

        describe('', function() {
            it('orderByChild()', function(done) {
                var i = 'women';
                ref.orderByChild('dsa').once('value', function(snap) {
                    snap.forEach(function(snap) {
                        assert.equal(snap.key(), i);
                        i = 'men';
                    });
                    done();
                })
            })
        })

        describe('', function() {
            it('orderByKey()', function(done) {
                var i = 213
                var ref = new Wilddog('https://dongkai.wilddogio.com/Query/women');
                ref.orderByKey().once('value', function(snap) {
                    snap.forEach(function(snap) {
                        assert.equal(snap.val(), i);
                        i = 3542;
                    });
                    done();
                })
            });
        });

        describe('', function() {
            it('orderByValue()', function(done) {
                var i = 'dsa'
                var ref = new Wilddog('https://dongkai.wilddogio.com/Query/women');
                ref.orderByValue().once('value', function(snap) {
                    snap.forEach(function(snap) {
                        assert.equal(snap.key(), i);
                        i = 'vzx';
                    });
                    done();
                })
            });
        });

        describe('', function() {
            it('orderByPriority()', function(done) {
                var i = 'women'
                ref.child('men').setPriority('dsa', function(err) {
                    assert.isNull(err);
                    ref.orderByPriority().once('value', function(snap) {
                        snap.forEach(function(snap) {
                            assert.equal(snap.key(), i);
                            i = 'men';
                        });
                        done();
                    })
                })
            });
        });

        describe('', function() {
            it('startAt()', function(done) {
                var i = 'faf';
                ref.child('men').orderByKey().startAt('faf').once('value', function(snap) {
                    snap.forEach(function(snap) {
                        assert.equal(snap.key(), i);
                        i = 'weq'
                    })
                    done();
                })
            });
        });

        describe('', function() {
            it('endAt()', function(done) {
                var i = '24ds';
                ref.child('men').orderByKey().endAt('dsa').once('value', function(snap) {
                    snap.forEach(function(snap) {
                        assert.equal(snap.key(), i);
                        i = 'dsa';
                    })
                    done();
                })
            });
        });

        describe('', function() {
            it('equalTo()', function(done) {
                var i = 'faf';
                ref.child('men').orderByKey().equalTo('faf').once('value', function(snap) {
                    snap.forEach(function(snap) {
                        assert.equal(snap.key(), i);
                    })
                    done();
                })
            });
        });

        describe('', function() {
            it('limitToFirst()', function(done) {
                var i = 0;
                ref.child('men').limitToFirst(1).once('value', function(snap) {
                    snap.forEach(function(snap) {
                        i += 1;
                        assert.equal(snap.val(), 'wadd');
                        assert.equal(i, 1);
                    })
                    done();
                })
            });
        });

        describe('', function() {

            it('limitToLast()', function(done) {
                var i = 0;
                ref.child('men').limitToLast(1).once('value', function(snap) {
                    snap.forEach(function(snap) {
                        i += 1;
                        assert.equal(i, 1);
                        assert.equal(snap.val(), 2725);
                    })
                    done();
                })
            });

        });

        describe('', function() {
            it('ref()', function(done) {
                var query = ref.limitToLast(10);
                assert.equal(query.ref().toString(), ref.toString());
                done();
            })
        });
    });

    describe('Wilddog.onDisconnect(Methods)', function() {

    })

    describe('Wilddog.ServerValue(Constants)', function() {
        it('TIMESTAMP', function(done) {
            var ref = new Wilddog('https://dongkai.wilddogio.com');
            ref.update({
                'timeStamp': Wilddog.ServerValue.TIMESTAMP
            }, function(err) {
                assert.isNull(err);
                ref.child('timeStamp').once('value', function(data) {
                    assert.equal(data.val().toString().length, 13);
                    done();
                })
            })
        });

        // it('limitToLast(err)', function(done) {
        //     var ref = new Wilddog('https://dongkai.wilddogio.com/limitToLast');
        //     var arr = [];
        //     var count = 0;
        //     var expectArr = [];
        //     var onPush = new Promise(function(resolve, reject) {
        //         ref.orderByChild('timestamp').limitToLast(10).on('child_added', function(dataSnapshot) {
        //             arr.push(dataSnapshot.val().timestamp);
        //         });
        //         ref.orderByChild('timestamp').limitToLast(10).on('child_removed', function(dataSnapshot) {
        //             arr.shift();
        //         });
        //         for (var i = 0; i < 12; i++) {
        //             setTimeout(function() {
        //                 ref.push({
        //                     timestamp: Date.now()
        //                 }, function(snap) {
        //                     count += 1;
        //                     if (count == 12) {
        //                         resolve();
        //                     }
        //                 });
        //             }, 200)
        //         };
        //     })
        //     var pushTime = function() {
        //         return new Promise(function(resolve, reject) {
        //             var ref = new Wilddog('https://dongkai.wilddogio.com/limitToLast');
        //             ref.orderByChild('timestamp').limitToLast(10).once('value', function(dataSnapshot) {
        //                 dataSnapshot.forEach(function(snap) {
        //                     expectArr.push(snap.val().timestamp);
        //                 })
        //                 resolve();
        //             })
        //         })
        //     }

        //     onPush
        //         .then(function() {
        //             pushTime()
        //                 .then(function() {
        //                     for (var i = 0; i < arr.length; i++) {
        //                         assert.equal(arr[i], expectArr[i]);
        //                     };
        //                     done();
        //                 });
        //         })

        // });
        after(function() {
            var ref = new Wilddog('https://dongkai.wilddogio.com/limitToLast');
            ref.off();
            ref.remove();
        })
    });
})
