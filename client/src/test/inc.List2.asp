<%
' 페이지별 처리
' 몰입커뮤니티 > 리스트페이지
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

<div class="layout-area">
    <h2 class="dep2-tit border-tit">
        IMMERSION
        <small>몰입 커뮤니티</small>
    </h2>

	<!-- 컨텐츠리스트 -->
	<form name="immersionListForm" id="immersionListForm" method="post">
		<input type="hidden" name="mainSiteCode" id="mainSiteCode" value="<%=siteCode%>" />
		<input type="hidden" name="aGotoPage" id="aGotoPage" value="" />
		<input type="hidden" name="immersionTagSearch" id="immersionTagSearch" value="" />
	</form>

    <div class="immersion-list" id="id_immersion_list"></div>
	<!-- //컨텐츠리스트 -->

    <!-- S : 더보기 -->
    <div class="btn-wrap txt-center" id="id_immersion_page"></div>
    <!--// E : 더보기 -->
</div>

<script>

$(function(){
	
    $('.immersion-list').masonry({
        itemSelector: '.immersion-card',
        gutter: 36,
        horizontalOrder: true,
        transitionDuration: '1s'
    });
	
});


// 리스트
function getList(page) {
	$("#aGotoPage").val(page);
	var actionUrl = "/_lightManage/immersion/xhr.list.asp";
	var params = decodeURIComponent(jQuery("#immersionListForm").serialize());
	var page = $("#aGotoPage").val();

	jQuery.ajax({
		type: "post",
		url: actionUrl,
		data: params,
		dataType: 'html',
		cache: false,
		async: true,
		error: function() {
		},
		beforeSend:function() {
		},
		success:function ( html, status ) {
			//alert(html);

			var $items = $(html);
			if (page == "1") {
				//$("#id_immersion_list").append($items).masonry( 'appended', $items);
				$("#id_immersion_list").html("");
				$("#id_immersion_list").html($items).masonry( 'appended', $items);
			} else {
				$("#id_immersion_list").append($items).masonry( 'appended', $items);
			}

			var endPage = $("#immersionTotalPageCount").val();
			//alert(endPage);
			//alert(page);
			if (parseInt(endPage) > parseInt(page)) {
				page = parseInt(page) + 1
				$("#id_immersion_page").html("<button type=\"button\" class=\"btn btn-more\" onclick=\"getList("+page+");\">더보기</button>");
			} else {
				$("#id_immersion_page").hide();
			}

			if (page == "1") {
				$('.immersion-list').masonry({
					itemSelector: '.immersion-card',
					gutter: 36,
					horizontalOrder: true,
					transitionDuration: '1s'
				});
			}

		},
		complete:function () {
			/*
			alert('aaa');
			$('.immersion-list').masonry({
				itemSelector: '.immersion-card',
				gutter: 36,
				horizontalOrder: true,
				transitionDuration: '1s'
			});
			*/
		}
	});
}

// 글쓰기
function sendWrite() {
	<% If isAuthLogin Then %>
	<% Else %>
		alert("로그인 후 이용해주세요");
		window.location = "/member/login.asp?returnURL=" + window.location.href;
		return;
	<% End If %>

	if ($("#contents").val() == "") {
		alert("내용을 입력해주세요");
		return;
	}
	if ($("#hashTag").val() == "") {
		alert("태그를 입력해주세요");
		return;
	}

	$("#isMode").val("REG");

	var Frm = document.immersionForm;
	var url = "/_lightManage/immersion/xhr.immersion.proc.asp";
	var xmlHttp = Ajax.getTransport();
	var serialize = getSerialize(Frm);

	Frm.action=url;
	Frm.submit();
	/*
	xmlHttp.open("POST", url, true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.onreadystatechange = xmlCallback;
	xmlHttp.send(serialize);

	function xmlCallback() {
		if (xmlHttp.readyState == 4) {
			//alert(xmlHttp.responseText);
			if (xmlHttp.status == 200) {
				data = xmlHttp.responseText;
				alert(data);

			} else if (xmlHttp.status == 204) {
				alert("전달된 데이터가 없습니다.");
			} else if (xmlHttp.status == 404) {
				alert("URL을 확인하세요.");
			} else if (xmlHttp.status == 500) {
				alert("ERROR.");
			}
		}
	}
	*/
}


// 리스트
getList(1);
</script>
