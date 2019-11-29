<!--#include virtual="/_light_common/systemSet/bof.asp"-->
<%
' 페이지별 처리
	' #####
	' 몰입커뮤니티
	' #####
	tblMenuIdx = "00"
	'pageAuth = false
' //페이지별 처리
%>
<!--#include virtual="/_light_common/include/pageAuth.asp"-->
<!--#include virtual="/_light_common/include/publicCode.asp"-->
<%
' 페이지별 처리
'printRequestValue()



' ==========
' request, 변수세팅, 페이징
' ==========



' ==========
' //request, 변수세팅, 페이징
' ==========

' ==========
' 쿼리
' ==========



' ==========
' //쿼리
' ==========

' ==========
' 개별처리, 페이징
' ==========



' ==========
' //개별처리, 페이징
' ==========



' //페이지별 처리
%>
<!--#include virtual="/_light_common/includeUI/inc.meta.asp"-->

<!-- S : 페이지별 css / script -->
<link rel="stylesheet" type="text/css" href="/_light_common/css/immersion.css?d=<%= now() %>">
<script type="text/javascript" src="/_light_common/js/libs/masonry.min.js"></script>
<!--// E : 페이지별 css / script -->

<!--#include virtual="/_light_common/includeUI/inc.head.asp"-->

	<!-- S : lnb -->
	<div class="lnb">
		<!--#include virtual="/_light_common/includeUI/inc.lnb.asp"-->
	</div>
	<!--// E : lnb -->

	<!-- S : content -->
	<div id="content">
		<!--S : 몰입 커뮤니티 -->
		<div class="immersion-area mb80">
			<!--#include virtual="/_lightManage/immersion/inc.List2.asp"-->
		</div>
		<!--// E : 몰입 커뮤니티 -->

		<!-- S: 오른쪽 카드 -->
		<div class="abs-wrap">
			<!-- S : 유저 프로필 -->
			<!--#include virtual="/_lightManage/immersion/inc.myImmersionInfo.asp"-->
			<!--// E : 유저 프로필 -->

			<!-- S : 인기태그 -->
			<!--#include virtual="/_lightManage/immersion/inc.tags.asp"-->
			<!--// E : 인기태그 -->
		</div>
		<!--// E: 오른쪽 카드 -->
	</div>
	<!--// E : content -->

	<!-- S : dim-layer -->
	<link rel="stylesheet" type="text/css" href="/_light_common/css/popup.css?d=<%= now() %>">

	<div class="dim-layer">
		<div class="dim-bg"></div>

		<!-- S : 작성하기 -->
		<!--#include virtual="/_lightManage/immersion/inc.Write.asp"-->
		<!--// E : 작성하기 -->
	</div>
	<!--// E : dim-layer -->

<script type="text/javascript">
	$(document).ready(function(){
		$('.abs-wrap').scrollToFixed({
			limit : function(){
				var limit = $('#footer').offset().top - $('#header').outerHeight() - $('.lnb').outerHeight() - $(this).outerHeight(true) - 110;
				return limit;
			}
		});
	});
</script>

<!--#include virtual="/_light_common/includeUI/inc.footer.asp"-->


<!--#include virtual="/_light_common/systemSet/eof.asp"-->
