/**
 * @author {娄露红}({WB085725})
 * @version 0.0.1
 */

KISSY.add(function (S, require) {

//    var XTemplate = require('tms/xtemplate');
	//    var XCtrl = require('market/xctrl');
	var Node = require('node');
	var UA = require('ua');
	var Event = require('event');
	var DataLazyload = require('kg/datalazyload/6.0.5/');
	var Tbvideo = require('kg/tbvideo/6.0.1/'),
		_JSON=require("json"),
		Slide = require('kg/slide/6.1.0/index');
	var $ = S.all;

	function Fullpage(obj) {
		this.node = obj.node || "";
		this.wrap = obj.wrap || "";
		this.wrap1 = obj.wrap1 || "";
		this.winheight = $(window).height();
		this.trigger = false;
		this.current = 0;
		this.len = this.node.length;
		this.innertime = 800; //如果苹果下不行改成1000
		this.callback = obj.callback || function (index) {
			//console.log(index);
		this.vid=0;
		this.uid=0;
		}
		this.init();
	}
	Fullpage.prototype = {
		setHeight: function () {
			var self = this;
			self.wrap.css('height', self.winheight);
			self.wrap1.css('height', self.winheight);
			self.node.css('height', self.winheight);
		},
		lazy: function (index) {
			var self = this;
			try {
				self.node.all('img').each(function (v, k) {
					if (!$(v).attr('src')) {
						$(v).attr('src', $(v).attr('data-ks-lazyload'));
					}
				});
			} catch (e) {

			}

		},
		refresh: function () {
			var self = this;
		},
		goindex: function (index, during) {
			var self = this;
			during = during || 0.3;
			self.wrap.all('.fullpage-inner').animate({
				"top": -index * self.winheight
			}, during, 'easing', function () {
				setTimeout(function () {
					self.trigger = false;
				}, self.innertime);
			});
			self.callback(index);
			self.lazy(self.current);
		},
		checkos: function () {
			var self = this;
			var os = UA.os;
			//console.log(os);
			if (os.indexOf("win") >= 0) {
				self.innertime = 0;
			}
		},
		bindEvents: function () {
			var self = this;
			// var vid=$('.by-mypage').item(self.current).find('.video_c').attr('data-vid');
			// var uid=$('.by-mypage').item(self.current).find('.video_c').attr('data-uid');
			// if($('.by-mypage').item(self.current).find('.video_con').length!=0){
			// 	var videobox=$('.by-mypage').item(self.current).find('.video_con').attr('id');
			// 	self.tbVideo(vid,uid,videobox)
			// }
			Event.on($('.fullpage-wrap'), 'mousewheel', function (e) {
				$('.by_site').show();
				if (!self.trigger) {
					self.trigger = true;
					var dir = e.delta; //滚动方向
					var during = 0.3;
					if (dir > 0 && self.current >= 1) {
						self.current -= 1;
					} else if (dir < 0 && self.current < self.len - 1) {
						self.current += 1;
					}
					self.goindex(self.current, during);

					// 一屏一滚 滚哪播哪
					// if($('.by-mypage').item(self.current).find('.video_c').length!=0){
					// 	var vid=$('.by-mypage').item(self.current).find('.video_c').attr('data-vid');
					// 	var uid=$('.by-mypage').item(self.current).find('.video_c').attr('data-uid');
					// 	if($('.by-mypage').item(self.current).find('.video_con').length!=0){
					// 		if(dir<0){
					// 			$('.by-mypage').item(self.current-1).find('object').hide();
					// 			// $('.by-mypage').item(self.current-1).find('.video_c').append('<div class="video_con" id="videobox'+(self.current)+'"></div>')
					// 		}
					// 		var videobox=$('.by-mypage').item(self.current).find('.video_con').attr('id');
					// 		self.tbVideo(vid,uid,videobox)
					// 	}else{
					// 		if(dir>0 && self.current >= 1){
					// 			$('.by-mypage').item(self.current+1).find('object').hide();
					// 			$('.by-mypage').item(self.current).find('object').show();
					// 			$('.by-mypage').item(self.current+1).find('.video_c').append('<div class="video_con" id="videobox'+(self.current+1)+'"></div>')
					// 		}else if(dir>0 && self.current == 0){
					// 			$('.by-mypage').item(0).find('object').show();
					// 			$('.by-mypage').item(self.current+1).find('object').hide();
					// 		}else if(dir <0){
					// 			$('.by-mypage').item(self.current-1).find('object').hide();
					// 			$('.by-mypage').item(self.current).find('object').show();
					// 			$('.by-mypage').item(self.current+1).find('.video_c').append('<div class="video_con" id="videobox'+(self.current+1)+'"></div>')
					// 		}
							
					// 	}
						
			         	
					// }else{
					// 	if(dir<0 && self.current == 0){
					// 		$('.by-mypage').item(0).find('object').show();
					// 	}else if(dir>0 && self.current == self.len - 1){
					// 		$('.by-mypage').item(0).find('object').hide();
					// 	}else if(dir<0 && self.current >= 1){
					// 		$('.by-mypage').item(self.current-1).find('object').hide();
					// 	}
					// }
					// 	var vid=$('.by-mypage').item(self.current).find('.video_c').attr('data-vid');
					// 	var uid=$('.by-mypage').item(self.current).find('.video_c').attr('data-uid');
					// self.tbVideo(vid,uid,videobox)
					
					e.preventDefault();

				}
			});

		},
		// tbVideo:function(vid,uid,videobox){
  //        	var _player = new Tbvideo.embedPlayer({
  //            	vid: vid,
  //            	uid: uid,
  //            	div: videobox,
  //            	width: "100%",
  //            	height: "100%"
  //        	}, {
  //            	autoplay: "false"
  //        	}, {
  //            	wmode: "opaque",
  //            	allowScriptAccess: "always",
  //            	allowFullScreen: "true"
  //        	});
  //     	},
		init: function () {
			var self = this;
			// console.log("init");
			if (UA.os.indexOf('ios') >= 0) {
				//pad下懒加载
				new DataLazyload({
					container: self.wrap
				}).refresh();

				$("#navBar").hide();
				$(".by-topcenter").css("margin-top", "0");

				//self.setHeight();
				self.wrap.css('height', self.winheight);
				self.node.css('height', 'auto');
				self.wrap.css('overflow', 'auto');
				return;
			}
			self.checkos();
			self.bindEvents();
			self.setHeight();
		}
	}
	function Mod() {
		this.init.apply(this, arguments);
	}

	Mod.prototype = {
		/**
		 * 入口
		 * @param dom 模块根节点
		 * @param conf 数据描述，为空说明已渲染
		 */
		init: function (container, conf) {
			var self = this;
			self._node = Node.one(container);
			//self.error可用于记录模块的异常 并且在jstracker平台查看 self.error('api错误')


			//存在数据描述，异步渲染
			if (conf) {
				self.loadData(conf);
			} else {
				//为空 绑定事件
				self.bindEvent();
			}

			var fullpage = new Fullpage({
				wrap: $('.fullpage-wrap'),
				wrap1: $('.by_w990'),
				node: $('.fullpage-module'),
				callback: function (index) {
					// console.log('当前第' + index + '帧');
					// self.p=index;
					// $("#navBar li").removeClass("active").item(index).addClass("active");
				}
			});
			fullpage.len = fullpage.len - S.one('.wb-bytd-alfullpage').all(".b").length;
			// console.log(fullpage.len);
			//fullpage.goindex(index);
			// console.log(fullpage.current)
			$('.li1').on('click',function(e){
				$(this).parent().find('a').removeClass('active');
				$(this).find('a').addClass('active');

				fullpage.goindex(1);
				fullpage.current=1;
				// console.log($('.by-mypage').item(1).attr('data-at'))
			})
			$('.li2').on('click',function(e){
				$(this).parent().find('a').removeClass('active');
				$(this).find('a').addClass('active');
				
				fullpage.goindex(3);
				fullpage.current=3;
			})
			$('.li3').on('click',function(e){
				$(this).parent().find('a').removeClass('active');
				$(this).find('a').addClass('active');
				
				fullpage.goindex(2);
				fullpage.current=2;
			})
			$('.li4').on('click',function(e){
				$(this).parent().find('a').removeClass('active');
				$(this).find('a').addClass('active');
				
				fullpage.goindex(4);
				fullpage.current=4;
			})
			//点击出现
			window.isopen = true;
			$('.zk_btn').on('click', function (e) {

				if ($(this).parent().hasClass('a') === true) {

					var i = S.indexOf(e.currentTarget, $(".zk_btn"));

					// $('.b').addClass('fullpage-module');
					/*$('.b').css('height','955px')*/
					$(this).parent().next('.b').show();
					$('.by-mypage').attr('data-at', 'true')
					$('.b').attr('data-t', 'true');
					if ($(this).parent().attr("isopen") != "true") {
						fullpage.len += 1;
					}
					fullpage.current += 1;
					fullpage.goindex(fullpage.current);
					$(this).parent().attr("isopen", "true");
					$(this).parent().next(".by-mypage").attr("isopen", "false");

					// if($('.by-mypage').item(fullpage.current-1).find('.video_c').length!=0){
					// 	$('.by-mypage').item(fullpage.current-1).find('object').hide();
					// 	$('.video_img').show();
					// }
					
					$('.byv_r').hide();

				} else {
					return false;
				}

			})

			$('.zk_btn').on('click', function (e) {
				if ($(this).parent().hasClass('b') === true) {

					var i = S.indexOf(e.currentTarget, $(".zk_btn"));
					$(this).parent().hide();
					if ($(this).parent().attr("isopen") != "true") {
						fullpage.len -= 1;
					}
					fullpage.current -= 1;
					fullpage.goindex(fullpage.current);
					$(this).parent().attr("isopen", "false");
					$(this).parent().prev(".by-mypage").attr("isopen", "false");

					// if($('.by-mypage').item(fullpage.current).find('.video_c').length!=0){
					// 	$('.by-mypage').item(fullpage.current).find('object').show();
					// }
					$('.video_img1').show();
				} else {
					return false;
				}

			})
			// console.log(fullpage.current);
			// 视频轮播
			
			$('.video_img').on('click',function(e){
				$('.video_img').show();
				$(this).hide();
				$('.page10_video').hide();

				$(this).next().show();
				var rid=$(this).next().find('.by_vb_class').attr('id');
				if($(this).next().find('.by_vb_class').length===0){
				// $(this).next().append('<div id="by_vb'+i+'" class="by_vb_class"></div>')
					$(this).next().show();
				}else{
					var vid=$(this).next().attr('data-vid');
					var uid=$(this).next().attr('data-uid');
					self.tbVideo1(vid,uid,rid);
				}
			});

			// 楼层视频
			$('.video_img1').on('click',function(e){
				$(this).hide();
				$(this).next().show();
				var rid=$(this).next().find('.video_con').attr('id');
				if($(this).next().find('.video_con').length===0){
					$(this).next().show();
				}else{
					var vid=$(this).next().attr('data-vid');
					var uid=$(this).next().attr('data-uid');
					self.tbVideo1(vid,uid,rid);
				}
			})
			// console.log(fullpage.trigger)
			Event.on($('.fullpage-wrap'), 'mousewheel', function (e) {
					$('.byv_r').hide();
					$('.page10_video').hide();
					$('.video_img').show();
					$('.video_img1').show();
					// console.log($('.by-mypage').item(fullpage.current).hasClass('first'))
					if($('.by-mypage').item(fullpage.current).hasClass('first')){
						$('.by_site').hide();

					}
			});

			self.slide();
            self.mmXpdbl();
		},
		slide:function(){
            var self = this;
        	var slide1=new Slide(self._node.one('.J_tab'),{
                eventType:'click',
                contentClass:'tab-content',
                pannelClass:'tab-pannel',
                selectedClass:'current',
                effect:'hSlide',
                carousel:false,
                colspan:2,
                touchmove:true,
                autoSlide:false,
                timeout:1000,
            }).on("afterSwitch",function(index){
            })
        	self._node.find('.by_next').on('click',function(){
        		$('.page10_video').hide();
        		$('.video_img').show();
            	slide1.next();
            });
            self._node.find('.by_prev').on('click',function(){
            	$('.page10_video').hide();
            	$('.video_img').show();
                slide1.previous();
                
            });
        },
        tbVideo1:function(vid1,uid1,vbx1){
         	var _player = new Tbvideo.embedPlayer({
             	vid: vid1,
             	uid: uid1,
             	div: vbx1,
             	width: "100%",
             	height: "100%"
         	}, {
             	autoplay: "true"
         	}, {
             	wmode: "opaque",
             	allowScriptAccess: "always",
             	allowFullScreen: "true"
         	});
      	},
        mmXpdbl: function () {
			var self = this;
            var classa = document.getElementById("by-page").className;
            // console.log(classa)
            function checkSc() {
                var scw = document.body.clientWidth;
                var sch=document.body.clientHeight;
                //         console.log(scw)
                if(scw <1900 && scw>1480){
                	document.getElementById("by-page").className = classa + " small_page3";
                }else if (scw < 1480 && scw > 1400) {
                   document.getElementById("by-page").className = classa + " small_page2";

                }else if(scw <1441 && scw>1399){

                }else if (scw < 1400 && scw > 1340) {
                	document.getElementById("by-page").className = classa + " small_page";
                }else if(scw<1349 && scw>1260){
                	if(sch<690){
                		document.getElementById("by-page").className = classa + " small_page1";
                	}else{
                		document.getElementById("by-page").className = classa + " small_page4";
                	}
                	

                }else if(scw <1261 && scw>1026){
                	document.getElementById("by-page").className = classa + " small_page1";
                }else if(scw < 1025 ){
                	document.getElementById("by-page").className = classa + " small_page5";
                }
                else{
                    //            console.log("大屏");
                    document.getElementById("by-page").className = classa;
                }
            }
            checkSc();
            window.onresize = function () {
                checkSc();
            };
        },
		//加载数据
		loadData: function (conf) {
			var self = this;
//            //XCtrl逻辑，参考文档：//gitlab.alibaba-inc.com/tbc/market/blob/master/xctrl.md
//            XCtrl.dynamic(conf, "items", function (data) {
//                //数据处理，模板渲染
//                S.log(data);
//                //模板完绑定事件
//                self.bindEvent();
//            })
		},
		//事件绑定
		bindEvent: function () {

		}
	};

	return Mod;

});
