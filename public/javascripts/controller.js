/**
 * Created by hama on 2017/5/11.
 */
//登陆模块
angular.module('loginApp', [])
    .controller('loginController', ($scope, $http) => {
        $scope.formData = {};
        $scope.error = '';
        $scope.success = '';
        //定义表单的提交行为
        $scope.postForm = () => {
            $http({
                method: 'POST',
                url: '/login',
                data: $.param($scope.formData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success((data) => {
                if (data == 'success') {
                    $scope.success = '登陆成功,5秒后跳转';
                    $('#successbox').fadeIn();
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 1000)
                } else {
                    $scope.error = data;
                    $('#errorbox').fadeIn();
                    setTimeout(function () {
                        $('#errorbox').fadeOut();
                    }, 1000)
                }
            }).error((err) => {
                console.log(err);
            })
        }
    })


//注册模块
angular.module('registerApp', [])
    .controller('registerController', ($scope, $http) => {
        //数据  当在表单中输入数据，会自动随着变化，通过ng-model已经绑定好了
        $scope.formData = {};
        //这是一个表单提交的行为
        $scope.postForm = () => {
            // -------------------angularJS中的$http发送请求的方法
            $http({
                method: 'POST',
                url: '/reg',
                data: $.param($scope.formData),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success((data) => {
                //     成功了
                if (data == 'success') {
                    // alert('注册成功')
                    $scope.success = '注册成功，5秒后跳转，请注意查收邮件';
                    $('#successbox').fadeIn();
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 5000)
                } else {
                    $scope.error = data;
                    $('#errorbox').fadeIn();
                    setTimeout(() => {
                        $('#errorbox').fadeOut();
                    }, 1000)
                }
            }).error((err) => {
                //     失败了
                console.log(err);
            })
        }
    })



