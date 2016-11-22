'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Acomponent = function (_React$Component) {
  _inherits(Acomponent, _React$Component);

  function Acomponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Acomponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Acomponent.__proto__ || Object.getPrototypeOf(Acomponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = { data: '', removedUser: [], removedUserIndex: [] }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // Create it with redux and it will be easier

  _createClass(Acomponent, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      // used axios cos fetch(es6) doesn't work here.
      axios.get('https://randomuser.me/api/?results=50&inc=id,name,phone,picture').then(function (data) {
        _this2.setState({ data: data.data.results });
      });
    }
  }, {
    key: 'deleteUser',
    value: function deleteUser(index) {
      var data = this.state.data;
      var theremovedUser = data.splice(index, 1);

      var removedUser = this.state.removedUser;
      removedUser.push(theremovedUser);

      var removedUserIndex = this.state.removedUserIndex;
      removedUserIndex.push(index);

      this.setState({ data: data, removedUser: removedUser, removedUserIndex: removedUserIndex }); // OK not that fast because CodePen is slow
    }
  }, {
    key: 'undo',
    value: function undo() {

      var data = this.state.data;
      var removedUser = this.state.removedUser;
      var removedUserIndex = this.state.removedUserIndex;

      var lastUserFromRemove = removedUser.pop();
      var lastIndexFromRemove = removedUserIndex.pop();

      data.splice(lastIndexFromRemove, 0, lastUserFromRemove[0]);

      this.setState({ data: data, removedUser: removedUser, removedUserIndex: removedUserIndex });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (!this.state.data) {
        return React.createElement(
          'div',
          { style: { padding: '20px 0', textAlign: 'center' } },
          ' Loading...  '
        );
      }
      //Better if you create a showUser Function insted of mapping in the dom.
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          ' ',
          React.createElement(
            'button',
            { onClick: this.undo.bind(this) },
            ' UNDO '
          ),
          '- Number of Undo Availlable: ',
          this.state.removedUser.length,
          '  '
        ),
        React.createElement(
          'ul',
          null,
          this.state.data.map(function (datas, index) {
            return React.createElement(
              'li',
              { key: index, onClick: _this3.deleteUser.bind(_this3, index) },
              React.createElement('img', { src: datas.picture.medium, alt: 'img' })
            );
          })
        )
      );
    }
  }]);

  return Acomponent;
}(React.Component);

;

ReactDOM.render(React.createElement(Acomponent, null), document.getElementById('root'));