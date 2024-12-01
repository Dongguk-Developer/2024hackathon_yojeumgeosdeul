document.addEventListener("DOMContentLoaded", function () {
    let answers;

    try {
        answers = JSON.parse(sessionStorage.getItem('answers'));
        console.log("Parsed answers:", answers);
    } catch (error) {
        console.error("Failed to parse answers:", error);
        return;
    }

    if (!answers) {
        console.error("No answers found in session storage.");
        return;
    }

    const recommendations = [
        {
            title: "경주스마트미디어센터, ㈜한수원과 손잡고 라이브커머스 방송시스템 구축",
            contentPreview: "경주스마트미디어센터가 ㈜한수원과 협력으로 방송 네트워크 시설인 라이브커머스 시스템을 구축했다고 14일 밝혔다. 라이브커머스 시스템 구축으로...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1340&&parm_bod_uid=284916&step=258"
        },

        {
            title: "경주시, 한수원 본사 방문해 고향사랑기부제 적극 홍보",
            contentPreview: "한국수력원자력㈜(이하 한수원) 본사를 방문해...경주 발전을 이루는데 한수원과의 지속적인 협력관계를 유지해 나가겠다”고 말했다. 한편 고향사랑기부제는 개인이 주민등록 주소지 이외의...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1340&&parm_bod_uid=284630&step=258"
        },
        
        {
            title: "부자도시를 꿈꾸는 경주시의 미래, 창조경제에서 답을 찾다",
            contentPreview: "수산인터스트리 외 8개의 한수원협력사가 경주에 둥지를 틀었다. 102개 기업, 2174억원 투자유치, 1,705명 고용. 이것이 경주시의 작년 기업유치 성적표이다. 강소기업들이 앞 다투어 경주로 오는...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=130737&step=258"
        },
        
        {
            title: "세계 속의 역사문화·창조경제 도시로 순항하는 경주",
            contentPreview: "새로운 신라 천년, 경주는 한수원 본사 및 관련 기업의...이전한 한수원은 1,200여 직원과 3,000여 명의 가족들이...마련했다. 여기에는 원자력협력기업 100개 유치, MICE 산업 활성화 등 5대...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=102114&step=258"
        },
        
        {
            title: "경주시, 문화재청, 한국수력원자력(주), 양동마을 양해각서 체결",
            contentPreview: "및 관계자, 김종신 한수원 사장 및 관계자, 경주 손씨...주민들이 불편을 해소하고, 한수원과의 아름다운 결연이 되길 바란다”고 말했다. ...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1338&&parm_bod_uid=88794&step=258"
        },
        
        {
            title: "경주시, 관광콘텐츠개발을 위한 관?산?학 협약 체결",
            contentPreview: "주낙영 경주시장, 김남현 동국대학교 경주캠퍼스 호텔관광외식경영학부 특성화 사업단장, 김진성 ㈜플랜이슈 대표 등이 참석했다. 역사?문화유산의 보고인 경주시는...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=172661&step=258"
        },
        
        {
            title: "주낙영 경주시장, 동국대 문화장터서 시민 토크쇼",
            contentPreview: "주낙영 경주시장이 23일 동국대학교 경주캠퍼스 통일광장에서 열린 &lsquo;2018 캠퍼스 문화장터&rsquo;를 참가해 시민과 함께 시정의 주안점과 평소 궁금했던 점을 자유롭게 대화하는...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1340&&parm_bod_uid=147034&step=258"
        },
        
        {
            title: "경주시, 청년 창업 활성화 위한 다각적 지원 확대",
            contentPreview: "주낙영 시장 “청년 창업 활성화로 지역 경제 부흥 가속화” 경주시가 청년 창업 활성화와 지역 경제 부흥에 박차를 가하고 있다. 25일 경주시에 따르면 지역 대표 청년 창업 정책인...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=280993&step=258"
        },

        {
            title: "경주시, 청년 창업 붐 일으킨다! ‘청년 신골든 창업특구 조성사업’ 예비 창업자 ...",
            contentPreview: "발굴 기대” 경주시가 ‘청년 신골든 창업특구 조성사업’에 참여할 예비 창업자를 모집한다고 13일 밝혔다. 이 사업은 황오동 재생구역 내 우수창업 아이템을 가진 예비 창업자들을...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1335&&parm_bod_uid=280400&step=258"
        },

        {
            title: "경주시, 황오동 원도심 활성화와 청년창업 두 마리 토끼 잡는다",
            contentPreview: "청년 창업자 유입으로 젊음과 활력이 넘치는 창업거리 조성 및 도시 경쟁력 회복 경주시가 청년 창업을 통해 황오동 원도심에 활력을 불어 넣고 있다. 시는 22일...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=267408&step=258"
        },

        {
            title: "경주시 청년센터, 청년 新골든 창업특구 조성사업Season 2 참여자 모집",
            contentPreview: "경주시 청년센터 ‘청년고도’에서 ‘청년 新골든 창업특구 조성사업(Season 2)’ 참여자(팀)를 오는 21일까지 모집한다. 이 사업은 경주시가 주관하고, ㈜한국수력원자력에서 후원하며...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1335&&parm_bod_uid=260988&step=258"
        },

        {
            title: "경주시 청년센터‘청년고도’, 청년특구 창업생태계 조성 프로젝트 참여자 모집",
            contentPreview: "4000만원 이내 지원금 지급 경주시 청년센터 ‘청년고도’는 황오동 일대 원도심 활성화를 위해 ‘경주시 청년특구 창업생태계 조성 프로젝트’ 참여자를 20일까지 모집한다고 밝혔다. 이 프로젝트는...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1335&&parm_bod_uid=234683&step=258"
        },

        {
            title: "경주시 양남면, 마을기업을 경작하는 하서3리 주민들",
            contentPreview: "힘쓴다면 경주시 경상북도를 넘어 우리나라의 대표 브랜드로 성장할 것”이라고 격려했다. ...10월에는 경북창조경제혁신센터로부터 2019년 경북형 로컬크리에이터 지원사업 우수상을...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1341&&parm_bod_uid=177571&step=258"
        },

        {
            title: "경주시, 2018 YOU-DREAM 취업박람회 개최",
            contentPreview: "밝혔다. 경상북도와 경주시, 고용노동부 포항지청이 공동 주최하고, 동국대학교...고용노동부와 경북창조경제혁신센터 프로그램에 대하여 안내하고...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1340&&parm_bod_uid=145406&step=258"
        },

        {
            title: "경주시, 청년 창업 활성화 위한 다각적 지원 확대",
            contentPreview: "주낙영 시장 “청년 창업 활성화로 지역 경제 부흥 가속화” 경주시가 청년 창업 활성화와 지역 경제 부흥에 박차를 가하고 있다. 25일 경주시에 따르면 지역 대표 청년...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=280993&step=258"
        },

        {
            title: "경주시, 청년농업인 임대농장에서 첫 수확… 미래 농업인 육성 박차",
            contentPreview: "경주시, 청년 농업인 맞춤 지원으로 미래 농업인 육성 박차 경주시는 내남면 신농업혁신타운에 조성된 청년농업인 경영실습 임대농장에서 청년 농업인들이...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=284684&step=258"
        },

        {
            title: "경주시, 1680억 규모 올해 첫 추경 편성... 총 예산 2조 680억으로 늘어...",
            contentPreview: "등을 편성했다. 지역경제 활성화와 서민지원을 위해 △경주페이 할인 판매보전금으로 36억원...증액된 14억원 등을 확보했다. 이어 △청년 임대주택 사업 33억원 △도시재생뉴딜사업 추진...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=276920&step=258"
        },

        {
            title: "경주시, ㈜일지테크 신증설 400억원 투자양해각서 체결",
            contentPreview: "고용창출, 경주1?2?3공장에 이은 네 번째 통근 투자 세계 자동차 부품 생산기업인...㈜일지테크는 2025년까지 외동2일반산업단지 내 임대공장과 연접부지 총 2만3500㎡를 매입해...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=268882&step=258"
        },

        {
            title: "경북도 최초 ‘전기완성차 공장’ 경주에 짓는다... 경주시, ‘미래 먹거리 산업’...",
            contentPreview: "e in Gyeongju 전기자동차에 정부보조금 외 추가지원금 지원하겠다” 강조 한국야쿠르트...전기차 및 배터리팩 생산시설 구축을 골자로 한 투자양해각서(MOU)를 체결했다. 이날...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=233489&step=258"
        },

        {
            title: "경주시, 기업 및 투자유치 촉진 개정 조례 시행",
            contentPreview: "지난 5월 30일 시행된 &lsquo;경상북도 기업 및 투자유치 촉진 조례&rsquo;의 개정 사항을... 주요 개정내용은 대규모투자기업 특별지원 한도금액을 당초 최고 100억 원에서 상한...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=168237&step=258"
        },

        {
            title: "주낙영 경주시장, 에코물센터 찾아 물산업 혁신 강조",
            contentPreview: "자체 개발한 급속수처리기술(GJ-R)이 국내 사업화는 물론 해외시장에서도 연이어 호평을 받으며...열린 국제물주간에서도 한국수자원공사의 해외지원기술로 선정돼 수처리 홍보부스 지원과 함께...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=136713&step=258"
        },

        {
            title: "경주시급속수처리기술(GJ-R), 싱가포르 국제물주간서 인기몰이",
            contentPreview: "워터비즈니스포럼, 스마트 통합 물 관리 우수사례로 발표 국내는 물론 해외시장에서 그... 경주시는 한국수자원공사(K-water)의 해외지원기술로 선정돼 이번 국제물주간에서 수처리...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=136009&step=258"
        },

        {
            title: "해오름동맹 원자력 혁신센터 주관‘원자력 특강’성료",
            contentPreview: "마무리 됐다. 특강은 동국대 WISE캠퍼스 해오름동맹 원자력혁신센터 주관으로 시민, 사회단체, 학생 등 70여명이 참석했다. 이번 특강은 원자력·신재생에너지에 대한 기초지식을 함양하고 원자력 관련...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1340&&parm_bod_uid=262956&step=258"
        },

        {
            title: "주낙영 경주시장, 역사와 미래가 공존하는 중단 없는 지역 발전 이끌겠다!",
            contentPreview: "세 번째 전략 프로젝트다. 신경주역세권 해오름 플랫폼 시티가 국토부 주관 공모사업인 투자선도지구로 지난해 12월 선정됨에 따라 신경주역...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=260522&step=258"
        },

        {
            title: "경주·울산·포항 동해남부권 해오름동맹 상생협의회, 실무협의회 개최",
            contentPreview: "포항시 등 3곳 지자체가 모여 ‘동해남부권 해오름동맹 상생협의회’ 실무협의회를 개최했다. ...김병삼 포항시 부시장, 그리고 실무진 등이 참석했다 이날 회의는 해오름 초광역 전철망...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1340&&parm_bod_uid=227520&step=258"
        },

        {
            title: "경주시, 정부 대형 공모사업 연이은 선정… 경제산업지도 대변화 예고",
            contentPreview: "중심의 융복합 자족도시 조성 신경주역세권 해오름 플랫폼 시티가 국토부 주관 공모사업인 거점 육성형 투자선도지구로 지난해 12월 선정됨에 따라...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=250431&step=258"
        },

        {
            title: "『경주비전 2040 미래종합발전계획』“10대 아젠다 100대 프로젝트”발표",
            contentPreview: "신라 팔색 황금정원, 남산 역사문화정원, 해오름 국가바다정원, 신(新)형산강 물결 정원, 경주...관광기업 혁신공정도시, 뉴트렌드 경주 관광플랫폼이 있다. 이와 관련 경주시는 선도적인...",
            link: "https://www.gyeongju.go.kr/news/page.do?mnu_uid=1334&&parm_bod_uid=233610&step=258"
        },
    ];

    const resultsList = document.getElementById("results-list");
    resultsList.innerHTML = "";

    const filteredRecommendations = recommendations.filter(rec => {
        return answers.some(answer => 
            rec.title.includes(answer) || rec.contentPreview.includes(answer)
        );
    });

    if (filteredRecommendations.length === 0) {
        resultsList.innerHTML = "<li>추천 결과가 없습니다.</li>";
    } else {
        filteredRecommendations.forEach(rec => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <h3>${rec.title}</h3>
                <p>${rec.contentPreview}</p>
                <a href="${rec.link}" target="_blank">링크로 이동하기</a>
            `;
            resultsList.appendChild(listItem);
        });
    }
});