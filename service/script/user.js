// 用户模块
define([
	'app',
	'cookie'
	],
	function(app,cookie){
		app.service('lmUserService', ['$http',"md5",function($http,md5){
			var urlPrefix = 'http://192.168.1.240:8002';
			var urlDict = {
				login:'/lingmall/oauth/access_token',
				register:"/lingmall/users/register",
				sendmobilecode:"/lingmall/sms/send",
				validationcode:" /lingmall/users/captcha"
			};
			var methodDict = {
				post:'POST',
				get:'GET'
			};

			// 我的商品库
			this.login = function(username,pwd){
				return $http({
					url:urlPrefix+urlDict.login,
					method:methodDict.post,
					data:{
						"username":username,
						"password":md5.createHash(pwd),
						"grant_type":"password",
						"client_id":"f3d259ddd3ed8ff3843839b",
						"client_secret":"4c7f6f8fa93d59c45502c0ae8c4a95b"
					}
				});
			};

			//注册
			this.register = function(mobile,email,pwd,captcha){
				return $http({
					url:urlPrefix + urlDirt.register,
					method:methodDict.post,
					data:{
						"moblie":mobile,
						"email":eamil,
						"password":md5.createHash(pwd),
						"captcha":captcha
					}
				});
			};

			/*"account": "18637633325",
  			"type": "1=>注册; 2=>重置密码"*/

			//发送手机验证码
			this.sendmobilecode = function(account,type){
				return $http({
					url:urlPrefix + urlDirt.sendmobilecode,
					method:methodDict.post,
					data:{
						"account":account,
						"type":type
					}
				})
			};

			/*{
			  "captcha": "123456",
			  "mobile": "15618688068",
			  "type": "1=>注册; 2=>重置密码"
			}*/

			//验证 验证码
			this.validationcode = function(captcha,mobile,type){
				return $http({
					url:urlPrefix + urlDirt.validationcode,
					method:methodDict.post,
					data:{
						"captcha":captcha,
						"mobile":mobile,
						"type":type
					}
				})
			};

			this.token = function(token){
				if(token === undefined){
					// return cookie.get('token');
					return cookie.get('token') || '1';
				}else{
					cookie.set('token',token);
				}
			};

		}]);
	}
);