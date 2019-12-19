var array_clitens = new Array();

module.exports = {
    is_login: function (sock) {
        var found = false;
        array_clitens.forEach(function(client) {
            if (client.address == sock.remoteAddress + ':' + sock.remotePort) {
                found = true;
            }
        });
        return found;
    },
    
    login: function (user_id, sock) {
        if (!this.is_login(sock)) {
            var obj = new Object;
            obj.address = sock.remoteAddress + ':' + sock.remotePort;
            obj.sock = sock;
            obj.user_id = user_id;

            array_clitens.push (obj);
        }
    },
    
    disconnect : function (sock) {
        var x = -1, i = 0;
        array_clitens.forEach(function(client) {
            if (client.address == sock.remoteAddress + ':' + sock.remotePort) {
                x = i;
            }
            i ++;
        });

        if (x != -1) {
            array_clitens.remove(x);
        }
    },

    print_connected : function () {
        array_clitens.forEach(function(client) {
            console.log ("Connected Adress -> " + client.sock.remoteAddress + ':' + client.sock.remotePort);
        });
    },

    is_connected: function (user_id) {
        var found = false;
        array_clitens.forEach(function(client) {
            if (client.user_id == user_id) {
                found = true;
            }
        });
        return found;
    },

    get_by_id: function (user_id) {
        var c;
        array_clitens.forEach(function(client) {
            if (client.user_id == user_id) {
                c = client;
            }
        });
        return c;
    }
}