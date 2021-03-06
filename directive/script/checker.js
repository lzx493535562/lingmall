define([
	"app",
	'underscore'
	],function(app,_){
	app.directive("lmchecker",function(){
		return {
			restrict:"A",
			link:function($scope,$element,$attrs){
				// 被选择的id字典
				$scope.checkids = {};
				// 是否全选
				$scope.isAllChecked = false;

				// 选择(toggle)
				$scope.check = function(id){
					$scope.checkids[id] = !$scope.checkids[id];
					$scope.isAllChecked = _.all($scope.checkids,function(v,k){return v;});
				};

				// 全选(toggle)
				$scope.checkAll = function(){
					$scope.isAllChecked = !$scope.isAllChecked;
					_.each($scope.checkids,function(v,k){
						$scope.checkids[k] = $scope.isAllChecked;
					});
				};


				// 设置全选的ids
				$scope.$on('checker.setMetadata',function(e,args){
					var ids = args;
					$scope.checkids = {};
					_.each(ids,function(id){
						$scope.checkids[id] = false;
					});
					$scope.isAllChecked = false;
				});
			}
		};

	});

});