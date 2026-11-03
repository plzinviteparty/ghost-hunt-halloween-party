'use strict';
const T=(text,who='나')=>({say:text,who}), F=(key,value=true)=>({op:'flag',key,value}), I=id=>({op:'give',id}), R=(room,x,y)=>({op:'room',room,x,y}), P=(id,join=true)=>({op:'party',id,join}), J=to=>({jump:to}), C=(text,options)=>({choice:text,options:options.map(([text,to])=>({text,to}))}), E=ending=>({ending}), Q=(flag,yes,no)=>({branch:flag,yes,no});
const ITEMS={sack:['포대 자루','드레스 대신 입었다. 태어날 때부터 갖고 있었다는데 기억은 없다.'],tape:['투명테이프','손목을 감싼 테이프. 뼈까지 비쳐 보인다. 클릭하면 손목을 살핀다.'],bone:['손목의 뼛조각','연회장 탁자 아래에서 찾았다. 주인에게 돌려주면 손목을 움직일 수 있다.'],keys:['열쇠 뭉치','고양이가 알려 준 곳에서 발견했다. 문 앞에서 조사하면 사용한다.'],record:['관찰 기록','감각 반응 10:26 / 보행 출력 없음. 손글씨로 ‘아직 자신이 걷는다고 믿는다’라고 적혀 있다.'],chalk:['분필','김솔음이 건넸다. 백룸의 벽에서 지나온 길을 표시할 수 있다.'],pen:['떠다니던 펜','표지판의 글을 고칠 수 있다. 물속 규칙이나 마지막 방에서 쓸 수 있을 것 같다.'],paper:['지워지지 않는 쪽지','내가 쓴 문장은 공간을 바꾼다. 쪽지와 펜은 몸이 바뀌어도 사라지지 않는다.']};
const ENDINGS={bones:{type:'BAD END 01',title:'한 곡 더 추실까요',text:'그는 내 손목에서 마지막 뼈를 뽑아 갔다.\n\n주저앉으려 했지만 다리는 계속 춤을 췄다.\n새 손님이 연회장에 들어왔다.\n나는 두 손을 앞으로 내밀었다.\n\n“내놔, 내놔.”',hint:'손목에 남은 것까지 낯선 남자에게 맡기면…….'},bed:{type:'BAD END 02',title:'퇴원 예정 없음',text:'“여기 있는 모두가 자기는 환자가 아니라 합니다.”\n\n나는 침대에 누웠다.\n천장의 불빛이 샹들리에로 바뀌었다.\n\n그곳은 외계인들의 프롬 파티였다.\n이번에는 집으로 돌아가야 한다는 생각이 들지 않았다.',hint:'간호 외계인의 안내를 끝까지 따라가 보세요.'},tofu:{type:'BAD END 03',title:'오늘의 간식',text:'슬라임 두부라서 느린 걸까.\n뒤에서 들리던 발소리가 바로 머리 위에서 멈췄다.\n\n화면 밖에서 금속 쟁반이 달그락거렸다.\n\n“자극에 대한 반응이 끊겼군.”',hint:'두부의 몸으로는 오래 멈춰 있을 수 없습니다.'},normal:{type:'NORMAL END',title:'후두부가 웃는군',text:'시간은 오전 10시 26분. 출근은 9시까지였다.\n나는 침대에서 일어나려 했다.\n\n그러고 보니…… 왜 웃었더라? 뭐가 웃겼지?\n\n유리 너머로 의사의 목소리가 들렸다.\n“후두부가 웃는군.”\n\n몸은 이미 사라졌다.\n보존 장치 속에 남은 후두부가 혼자 이야기를 이어 가고 있었다.',hint:'원문의 사건을 따라 마지막 방까지 도착하세요.'},happy:{type:'HAPPY END',title:'이번에는 내가 초대할게',text:'나는 출근할 몸이 없다는 사실을 알아차렸다.\n주머니에 넣어 둔 펜의 감촉만은 남아 있었다.\n\n빈 벽에 문을 그리고 그 아래 적었다.\n‘들어오고 나가는 것은 각자의 자유.’\n\n문을 열자 저택의 연회장이 보였다.\n고양이가 창가에서 꼬리를 흔들었다.\n나는 포대 자루의 매듭을 고쳐 묶고 음악을 골랐다.\n\n유리 밖의 의사는 같은 반응을 기록했다.\n그 안에서 누가 파티를 여는지는 알지 못했다.',hint:'손목과 병동 기록을 살피고, 펜을 놓치지 않은 채 마지막 방에 도착하세요.'}};
const SCRIPTS={
intro:[T('그곳은 외계인들의 프롬 파티인 것으로 추정되는 곳이었다.',''),T('나만 빼고 다 외계인이었다.\n그럼 내 프롬 파트너는?'),T('나에게는 입을 드레스도 없다.\n당황한 나는 날 때부터 가진 포대 자루를 입었다.'),I('sack'),I('tape'),T('손목에는 투명테이프가 감겨 있었다.\n테이프 아래로 뼈가 보였고, 한 조각이 비어 있었다.'),T('손목을 움직이기 불편해. 뼛조각을 찾아야겠다.'),F('intro'),T('방향키 또는 아래 버튼으로 이동하세요.\n빛나는 대상 가까이에서 E / 조사. 화면을 눌러 이동할 수도 있습니다.\n메뉴에서 언제든 저장·불러오기를 할 수 있습니다.','조작 안내')],
wrist:[T('테이프는 피부처럼 달라붙어 있었다.\n손목을 쥐어도 맥박이 잡히지 않았다. 뼈 사이에는 피 대신 희미한 빛이 흘렀다.'),T('“아프다”는 생각은 드는데, 실제 통증은 느껴지지 않았다.'),F('wrist'),T('기록 추가 · 몸의 감각이 이상하다.','')],
mirror:[T('거울 속에는 포대 자루를 입은 내가 있었다.\n돌아서자 뒷머리 부분만 한 박자 늦게 따라왔다.'),T('나는 잠깐 어지러웠다고 생각하고 눈을 비볐다.')],
man:[T('외계인 분장을 한 것으로 추정되는 남자를 저 멀리서 발견했다.',''),T('뼛조각을 같이 찾아 주실래요?'),T('뼛조각을 삼키면 사랑과 순수라는 저주에서 풀려날 수 있습니다.','남자'),T('그런데 그걸 찾아 주면 나에게 무엇을 줄 거야?','남자'),T('당신이 원하는 것이라면 뭐든지.'),T('그러면 일단 한 곡 추실까요, 레이디?','남자'),T('뼛조각이 모자라온데 어찌 춤을 추옵니까.'),T('이 방에서 나가려면 춤을 추어야 해. 그게 암호야.','남자'),F('metMan'),J('manChoice')],
manChoice:[C('남자는 손목을 내밀라고 한다.',[['춤만 배운다','danceIntro'],['남은 뼈까지 맡긴다','giveBones'],['먼저 주위를 살펴본다','leaveMan']])],
leaveMan:[T('내 손목부터 제대로 고치자. 탁자 아래에 흰 무언가가 보인다.')],
giveBones:[T('남자의 몸에는 서로 다른 뼛조각들이 군데군데 튀어나와 있었다.\n그가 내 손목을 잡고 엄지로 빈틈을 눌렀다.',''),C('정말 맡길까?', [['손을 뺀다','leaveMan'],['그대로 내버려 둔다','bonesEnd']])],bonesEnd:[E('bones')],
bone:[T('탁자 아래에서 작은 뼛조각을 발견했다.\n내 손목의 빈 곳에 꼭 들어맞았다.'),I('bone'),F('boneFound'),T('손목을 움직일 수 있게 됐다.\n남자의 춤을 따라 할 수 있을 것 같다.')],
danceIntro:[T('그는 뼛조각 없이도 출 수 있다며 팝핀을 추기 시작했다.\n팝핀의 효과는 굉장했다! 나는 넋을 놓고 박수를 쳤다.',''),T('가만, 두 손을 앞으로 내밀며 내놔, 내놔?\n뼛조각까지 내놓으라고 갈취하는 동작이었다.'),T('손목을 지키며 발 동작만 따라 하자.',''),{mini:'dance'},F('danced'),T('댄스 타임은 끝났습니다!','사회자'),T('우리는 인간들과 친해지고 싶어서 당신을 이곳에 초대했어요.\n우리에게 인간의 문화를 가르쳐 준다면 집으로 돌아가게 해 줄게요.','외계인'),T('집에 돌아갈 수 있다는 말이 믿기지 않았다.\n창밖의 하늘은 방송이 끝난 텔레비전 색이었다.'),T('무언가 종아리에 닿았다. 구석으로 숨어 들어온 고양이였다.',''),T('이쪽.','고양이')],
kim:[T('김솔음이라는 명찰을 찬 남자가 내 손목을 보고 멈춰 섰다.',''),T('이 저택에서는 말이 너무 빨리 사실이 돼요.\n낯선 사람이 원하는 걸 다 주겠다는 약속은 하지 마세요.','김솔음'),C('같이 출구를 찾아볼까?', [['함께 간다','kimJoin'],['혼자 살펴본다','kimLeave']])],kimJoin:[P('kim'),I('chalk'),F('kimMet'),T('그는 분필을 내밀고 내 뒤에 섰다.\n같이 움직이되 문을 넘기 전에는 주변을 확인하기로 했다.','')],kimLeave:[F('kimMet'),T('길을 잃으면 벽에 표시를 남기세요.','김솔음')],
cat:[T('고양이가 가리킨 곳에는 열쇠 뭉치가 있었다.',''),I('keys'),F('catFound'),P('cat'),T('나는 열쇠를 챙겼다. 고양이가 내 뒤를 따라왔다.\n출구처럼 보이는 북쪽 문으로 가 보자.')],
exitProm:[T('외계인들이 한눈판 사이 열쇠를 하나씩 맞췄다.',''),T('우리는 너희와 친구가 되고 싶었던 것뿐인데,\n외형이 다르다는 이유로 차별하는 거야?','외계인'),T('친구가 되고 싶다고 해서 납치할 권리가 주어지진 않아.'),T('열쇠가 덜그럭 맞춰지며 문이 열렸다.\n나는 고양이를 안아 들고 나왔다.'),R('landing',4,6),T('나왔다고 생각하기도 잠시, 눈앞에는 다시 대저택의 홀이 펼쳐졌다.',''),P('cat',false),P('kim',false),T('어라? 고양이가 사라졌다.\n함께 걷던 발소리도 끊겼다.'),T('방명록도 문도 똑같다.\n나만은 이 저택에서 나갈 수 없는 걸까?'),F('looped')],
landingDoor:[T('손잡이를 잡자 출입문에 붙은 종이가 바뀌었다.\n‘환자 출입구’',''),T('식사 시간입니다. 환자 여러분은 모두 침대로 돌아가 주세요!','안내 방송'),T('촉수 달린 친절한 외계인들이 나에게 다가와 나를 부축했다.\n그야 환상이었으니까. 그들은 나를 보살피고 있는 것뿐이라고 했다.',''),R('ward',4,12),T('나는 환자가 아니야!'),T('여기 있는 모두가 자기는 환자가 아니라 합니다.','간호 외계인')],
record:[T('침대 발치의 관찰 기록을 펼쳤다.\n「감각 반응 10:26 / 보행 출력 없음」',''),T('손글씨가 덧붙어 있었다.\n‘아직 자신이 걷는다고 믿는다.’'),I('record'),F('readRecord'),T('내가 걷고 있는데 보행 출력이 없다고?\n일단 기록을 챙겼다.')],
nurse:[T('투명하고 말랑거리는 형체가 아름답게 느껴졌다.\n몸속이 비쳐 보였다. 심장 부근에 레버가 있었다.',''),C('간호 외계인이 빈 침대를 가리킨다.',[['침대로 돌아간다','bedWarning'],['몸속의 레버를 잡아당긴다','lever']])],bedWarning:[T('침대 위 이름표는 내 이름을 정확히 알고 있었다.\n누우면 처음부터 다시 시작할 것 같은 기분이 들었다.'),C('누울까?', [['아직 나갈 방법을 찾는다','stayWard'],['이제 쉬고 싶다','bedEnd']])],stayWard:[T('나는 침대에서 한 걸음 물러섰다.')],bedEnd:[E('bed')],
lever:[T('레버를 잡아당기자 간호 외계인들이 녹아내렸다.\n녹아내린 외계인들은 수가 불어나기 시작했다.',''),F('melted'),R('bath',4,7),T('수가 너무 늘어나서 마치 슬라임 목욕탕에 빠진 것 같다.\n원래 좋은 온천은 목욕 후에 몸이 미끌미끌해진다고 하지 않던가.'),T('나는 아마 최상급 온천에 있는 게 분명하다.\n……그래도 여기서 나가야 한다.')],
ode:[T('목욕물이 바풍에 적격이어 보인다.\n그때 오데가 나타나 개큰바풍을 만들어 사람들을 가둬 버렸다.',''),T('바풍…… 가더떠…….','오데'),T('난장판이다! 일단 그쪽으로 따라가자. 길이 있을지도 모른다.'),P('ode'),F('odeJoined'),T('오데가 물풍선 사이로 길을 냈다. 동쪽 문까지 따라가자.','')],
bathExit:[T('우리는 넘쳐흐르는 슬라임을 피해 복도로 빠져나왔다.',''),P('ode',false),R('loop',3,5),T('따라가도 길은 존재하지 않았다.\n계속 걷고 있음에도 같은 곳만 돌고 있는 것 같다.'),T('알고 보니 진짜 같은 곳만 돌고 있었다!')],
loopWrong:[F('wrongTurn'),T('익숙한 벽의 흠집이 또 나타났다.\n같은 복도로 돌아왔다. 표지판 화살표와 반대쪽을 확인해 보자.'),R('loop',3,5)],
backroom:[T('벽지의 벌어진 틈에서 형광등 소리가 샜다.\n문을 밀자 노란 벽과 눅눅한 카펫이 이어졌다.',''),R('backroom',3,4),T('백룸인가!'),T('여기서부턴 문보다 바닥에 남은 흔적을 믿자.\n한참 떨어진 곳에서 의자가 덜그럭거렸다.')],
chalk:[T('분필로 벽에 화살표를 남겼다.\n의자 소리는 동쪽 아래에서 들린다.'),F('marked')],
chair:[T('저 끝에 의자 한 채가 덩그러니 놓여 있었다.\n의자가 덜그럭거리기 시작했다.',''),T('의자에 무슨 장치가 있을지도 모른다.\n등받이를 살펴보자.'),C('등받이에 버튼이 있다.',[['버튼을 누른다','fall'],['조금 더 살펴본다','chairWait']])],chairWait:[T('의자 다리 아래로 물 냄새가 올라온다.\n이 복도에서는 다른 출구를 찾을 수 없었다.')],
fall:[T('버튼을 누르자 발밑에 구멍이 뚫렸다.\n나는 그대로…… 떨어졌다!',''),R('pool',5,5),T('으아아아아아아아아아……!\n출렁~ 그렇게 나는 살아남았다.'),T('물이었다. 올라갈 수 없었기에 앞으로 헤엄치려 했지만\n이곳은 좁고 깊었다.'),T('탁! 발목에 뭔가 잡힌 것 같았다.\n벽에 탈출 장치가 보였다.')],
button:[T('「탈출 버튼. 인간만 누르시오.」','표지판'),T('나는 탈출 버튼을…… 눌렀다!'),T('하지만 작동하지 않았다. 왜지?'),T('그래, 나는 사실 인간이 아니었기 때문이었다.\n알고 보니 핼러윈 귀신이었던 걸까?'),T('아니, 그럴 리가 없어! 아까 외계인들이 친하게 지내고 싶다고 했다.'),T('문구 밑에 작은 글씨가 있다.\n「너는 누구지?」',''),F('buttonTried'),T('근처에 펜 하나가 동동 떠다니고 있었다.\n저 규칙…… 잘하면 수정할 수 있을 것 같다.')],
pen:[I('pen'),F('penFound'),T('펜을 잡았다. 물속인데도 종이에 글씨가 써졌다.\n‘너는 누구지?’라는 문구를 고쳐 보자.')],
sign:[C('펜으로 무엇을 쓸까?', [['지지 신 최강 준오 형님임.','deity'],['너는 두부지?','rewrite'],['펜을 좀 더 살펴본다','penLook']])],deity:[T('지지 신 최강 준오 형님임.'),T('표지판에 ‘분류 불가’라는 글씨가 나타났다.\n버튼은 여전히 움직이지 않았다. 다른 문장을 써 보자.','')],penLook:[T('펜 끝에 물방울이 맺히지 않는다.\n조그만 쪽지에 ‘내가 쓴 문장은 공간을 바꾼다’고 적었다.'),I('paper'),F('testedPen'),T('주머니가 젖지 않았다.\n이 펜과 쪽지는 몸이 바뀌어도 남을 것 같다.')],
rewrite:[T('나는 신인가, 인간인가, 귀신인가…… 아니!\n펜으로 ‘너는 누구지?’에 획을 그었다.'),T('너는 두부지?','표지판'),F('tofu'),T('그렇게…… 인간이 아닌 나는 슬라임 두부가 되었다!\n말랑한 몸이 발목을 붙잡던 틈에서 빠져나왔다.',''),T('물이 빠진 배수로로 미끄러져 나왔다.\n멀리서 배고픈 하치와레가 걸어오고 있었다.'),C('도망치기 전에 손에 걸린 펜을……', [['몸 안에 넣어 챙긴다','keepPen'],['버리고 빨리 도망친다','dropPen']])],keepPen:[F('keptPen'),J('chaseIntro')],dropPen:[{op:'drop',id:'pen'},J('penLeft')],
chaseIntro:[T('내가 알던 하치와레가 아닌 것 같은데?'),T('응, 정답!',''),T('민트색 발톱 하나가 복도 전체를 가로질렀다.\n얼굴이 나타난 것이 아니라 벽이 얼굴의 일부라는 걸 알아차렸다.',''),T('도망치지 않으면 죽는다.\n전속력으로 뛰었다.'),R('chase',3,8),T('오른쪽 끝의 불빛까지 도망치세요.\n가구는 돌아가야 합니다. 메뉴를 열면 추격도 멈춥니다.\n실패해도 자동 저장에서 다시 할 수 있습니다.','추격전'),F('chaseActive')],
rescued:[F('chaseActive',false),T('그런데 그때 UFO가 나타나 괴물 고양이를 잡아갔다!',''),R('wreck',5,9),T('안심하기도 전에 괴물 고양이가 UFO를 박살냈다.\n박살 난 UFO 속에서 치이카와와 우사기가 꼬질한 모습으로 기어 나왔다.',''),T('요 사고뭉치 녀석, 또 UFO를 박살 내면 어떡하니!\n네 친구들도 와 있는데!','고양이의 어머니'),T('고양이는 괴물이 아니라 UFO에 타고 있던 외계인들의 가족이었다.',''),T('휴, 만나서 다행이다.\n나는 달리던 걸 멈추었다.'),T('아까의 ‘너는 두부지?’ 문구를 떠올리곤 웃었다.'),F('ufoDone'),T('잔해 사이로 익숙한 침실 문이 보였다.\n누군가 알람을 끄는 소리가 났다.')],
family:[T('아까 쫓아와서 미안해.\n두부가 혼자 움직이길래 우리 집 간식인 줄 알았어.','고양이'),T('초대받은 친구한테 그러면 못 써.','고양이의 어머니')],
wake:[T('……라는 꿈을 꿨다.',''),R('bedroom',5,8),F('tofu',false),T('일어나니 이미 시간은 오전 10시 26분이었다.\n출근이 9시까지인데.'),T('그러고 보니…… 왜 웃었더라? 뭐가 웃겼지?')],
clock:[T('10:26.\n초침도 휴대폰도 똑같은 시각에서 멈춰 있었다.\n병동의 관찰 기록에 적힌 숫자였다.')],
finalDoor:[Q('keptPen','checkTruth','normalEnd')],checkTruth:[Q('wrist','checkRecord','normalEnd')],checkRecord:[Q('readRecord','finalChoice','normalEnd')],
finalChoice:[T('손목에는 맥박이 없었다.\n기록에는 보행 출력이 없다고 했다.\n그런데 나는 계속 걷고 있었다.'),T('나는 문을 열려고 손을 뻗었다.\n손의 감각은 있는데 손이 어디 있는지 보이지 않았다.'),T('지금 보고 있는 방도 누군가 만들어 내는 장면일까?\n주머니 속 펜만은 내 생각대로 움직였다.'),C('어떻게 할까?', [['출근해야 한다. 현관문을 연다.','normalEnd'],['펜으로 내가 나갈 문을 그린다.','happyReveal']])],
normalEnd:[R('lab',8,8),T('“후두부가 웃는군.”','브리아노 연구소장'),T('침실도 팔도 없었다.\n주인공은 이미 죽었고, 보존 장치 안에는 후두부만 남아 있었다.',''),E('normal')],
happyReveal:[R('lab',8,8),T('“후두부가 웃는군.”\n유리 밖에서 브리아노 소장이 말했다.',''),T('나는 이미 죽었다. 남아 있는 것은 후두부와\n그 안에서 계속되는 이 이야기뿐이었다.',''),T('내가 쓴 문장은 공간을 바꾼다.\n그렇다면 마지막 문장도 내가 쓸 수 있다.'),E('happy')],
needDance:[T('문에는 ‘댄스 타임이 끝난 뒤 퇴장 가능합니다’라고 적혀 있다.\n먼저 연회장의 남자에게 말을 걸어 보자.')],needKeys:[T('문이 잠겨 있다. 무대 옆 고양이가 이쪽을 보고 있다.')],needBone:[T('동작을 따라 하려는데 손목이 꺾였다.\n먼저 탁자 아래에서 내 뼛조각을 찾아야겠다.')],lockedWard:[T('잠긴 문 너머에서 슬라임이 찰박거린다.\n간호 외계인의 몸속 레버가 문과 연결되어 있다.')],needOde:[T('커다란 물풍선이 문을 막고 있다.\n바풍을 만든 오데에게 말을 걸어 보자.')],needButton:[T('표지판부터 읽어 보자. 펜은 물 위에 떠 있다.')],nothing:[T('지금은 다른 것을 먼저 살펴보자.')],catGone:[T('품 안은 텅 비어 있었다.\n고양이를 부르는 소리만 홀에 남았다.')]
};
const O=(id,x,y,kind,label,extra={})=>({id,x,y,kind,label,...extra});
const MAPS={
prom:{name:'프롬 파티',theme:'mansion',w:36,h:24,mission:'손목의 뼛조각을 찾아 출구를 열자',objects:[O('mirror',4,5,'mirror','거울'),O('man',18,11,'man','삐에로 분장을 한 남자'),O('bone',9,15,'bone','탁자 아래 뼛조각',{hide:'boneFound'}),O('kim',28,13,'kim','명찰을 찬 남자',{hide:'kimMet'}),O('cat',26,5,'cat','말하는 고양이',{need:'danced',hide:'catFound'}),O('exitProm',18,2,'door','연회장 출구')],props:[['table',8,13],['table',28,17],['stage',18,4],['piano',5,19],['plant',32,5],['plant',3,10],['chair',24,18],['chair',30,18],['chair',6,14],['chair',10,14]]},
landing:{name:'다시, 대저택의 홀',theme:'mansion',w:28,h:20,mission:'같은 홀로 돌아왔다. 다른 문을 살피자',objects:[O('landingDoor',22,6,'door','환자 출입구'),O('catGone',7,6,'ghostcat','고양이가 있던 자리')],props:[['desk',12,7],['table',9,13],['plant',3,3],['plant',24,15],['clock',14,3],['mirror',3,12]]},
ward:{name:'간호 외계인의 병동',theme:'ward',w:32,h:23,mission:'관찰 기록과 간호 외계인을 조사하자',objects:[O('record',9,7,'book','관찰 기록',{hide:'readRecord'}),O('nurse',21,12,'nurse','간호 외계인'),O('lockedWard',27,3,'door','잠긴 병동 출구')],props:[['bed',7,5],['bed',15,5],['bed',23,5],['bed',7,17],['bed',15,17],['desk',27,17],['monitor',28,6]]},
bath:{name:'슬라임 온천',theme:'slime',w:36,h:23,mission:'오데를 만나 동쪽 문으로 나가자',objects:[O('ode',19,10,'ode','바풍을 만든 오데',{hide:'odeJoined'}),O('bathExit',32,9,'door','복도로 통하는 문')],props:[['bubble',10,7],['bubble',12,14],['bubble',24,7],['bubble',25,15],['bubble',29,10],['bubble',16,17],['bath',5,17]]},
loop:{name:'되풀이되는 복도',theme:'backroom',w:32,h:16,mission:'되돌아오는 문 대신 벽의 틈을 찾자',objects:[O('loopWrong',28,5,'door','출구라고 적힌 문'),O('backroom',18,12,'crack','벌어진 벽지')],props:[['chair',8,5],['plant',24,11],['sign',21,3]]},
backroom:{name:'BACKROOM / 버려진 방들',theme:'backroom',w:50,h:30,mission:'형광등 아래 미로 끝에서 의자 소리를 찾자',objects:[O('chair',45,24,'chair','덜그럭거리는 의자'),O('chalk',4,5,'mark','지나온 길 표시')],props:[['chair',6,14],['chair',14,9],['chair',15,10],['chair',24,23],['chair',34,12],['chair',35,13],['chair',44,6],['chair',44,7],['chair',42,5],['bath',26,10],['fireplace',6,24]]},
pool:{name:'물 아래의 탈출 장치',theme:'water',w:24,h:28,mission:'인간 전용 버튼을 조사하고 떠다니는 펜을 찾자',objects:[O('button',16,20,'sign','인간 전용 탈출 버튼'),O('pen',8,19,'pen','떠다니는 펜',{need:'buttonTried',hide:'penFound'})],props:[['pipe',5,14],['pipe',19,8],['pipe',5,23]]},
chase:{name:'두부의 도주',theme:'backroom',w:64,h:17,mission:'오른쪽 끝의 불빛까지 도망쳐!',objects:[],props:[['chair',14,8],['chair',23,9],['chair',30,7],['chair',39,8],['chair',47,9],['chair',53,7]]},
wreck:{name:'UFO 추락 지점',theme:'yard',w:32,h:22,mission:'가족을 만난 뒤 익숙한 침실 문으로',objects:[O('family',19,10,'hachi','하치와레와 가족'),O('wake',27,6,'door','익숙한 침실 문')],props:[['ufo',18,5],['smallcat',13,12],['rabbit',23,13],['alien',25,10],['plant',5,4],['plant',7,17],['plant',26,17]]},
bedroom:{name:'오전 10시 26분',theme:'bedroom',w:24,h:19,mission:'시계와 문을 확인하자',objects:[O('clock',15,4,'clock','멈춘 시계'),O('finalDoor',20,13,'door','출근하려면 나가야 하는 문')],props:[['bed',5,5],['desk',16,7],['mirror',4,13],['plant',20,3]]},
lab:{name:'브리아노 소장의 관찰실',theme:'lab',w:20,h:15,mission:'',objects:[],props:[['tank',10,6],['monitor',15,5],['doctor',14,9]]}
};

// Chair heaps occupy floor cells; paths retain the original maze connections.
MAPS.backroom.props.push(...[[3,10],[6,19],[13,15],[16,27],[23,12],[26,26],[33,16],[36,4],[43,12],[46,17]].map(([x,y])=>["chairPile",x,y]),["fallenChair",7,13],["fallenChair",27,19],["fallenChair",44,14]);

for(let section=0;section<5;section++){for(const [dx,y] of [[2,11],[7,17],[2,26],[7,4]]){const x=section*10+dx;if(!MAPS.backroom.props.some(p=>p[1]===x&&p[2]===y))MAPS.backroom.props.push(["chairPile",x,y]);}}

// Narrative revision: retain existing scene IDs for saved games.
const puzzle=(title,help,labels,answer,hint)=>({puzzle:true,title,help,labels,answer,hint});
SCRIPTS.intro.unshift(T('나는 저택에서 눈을 떴다. 테이블에 엎드려 있었던 모양이다. 마지막으로 기억나는 건 입구에서 초대장을 보여 준 일인데, 언제 여기까지 들어왔는지는 기억나지 않았다.'));
SCRIPTS.intro.splice(3,1,T('나에게는 입을 드레스도 없다.'),T('그래서 나는 당황했다.'),T('당황한 나는 날 때부터 가진 포대 자루를 입었다.'));
SCRIPTS.kim=[T('명찰을 보고 여기 직원이냐고 물었다. 김솔음은 고개를 저었다.'),T('저도 나갈 방법을 찾고 있습니다.','김솔음'),C('같이 출구를 찾아볼까?', [['함께 간다','kimJoin'],['혼자 살펴본다','kimLeave']])];
SCRIPTS.exitProm.splice(1,0,puzzle('열쇠 맞추기','열쇠 홈은 왼쪽부터 깊음·없음·얕음이다. 각 홈을 눌러 맞추자. ○ 없음 / ◐ 얕음 / ● 깊음',['왼쪽 홈','가운데 홈','오른쪽 홈'],[2,0,1],'● ○ ◐'));
SCRIPTS.landingDoor.unshift(T('문을 몇 번 더 열어 봤다. 김솔음이 밖에 서 있을 때는 그대로인데 내가 넘으면 다시 홀로 돌아왔다.'),T('위층에서 백의를 입은 남자가 내려왔다.'),T('손을 그렇게 쓰시면 안 됩니다. 브리아노입니다. 손부터 봅시다.','브리아노'),T('그는 뼛조각을 고정하고 테이프를 감았다. 이번에는 주먹을 쥘 수 있었다.'),T('이제 집에 가도 돼요?'),T('오늘은 좀 더 계셔야 합니다. 아까 설명드렸습니다.','브리아노'),T('저 선생님 처음 보는데요.'),T('그가 보여 준 입원 동의서에는 내 서명이 있었다. 날짜를 확인하려고 당겼지만 먼저 가져갔다.'),T('침대에서 쉬세요. 물건은 나중에 돌려드리겠습니다.','브리아노'));
SCRIPTS.record=[T('침대 발치에 놓인 기록을 펼쳤다. 내 이름 아래에 같은 문장이 여러 번 적혀 있었다. 「집에 보내 주세요.」'),I('record'),F('readRecord'),T('나는 기록을 접어 챙겼다. 뒷장 안쪽에 손톱이 걸렸다. 종이가 한 장 더 있는 것 같았다.')];
SCRIPTS.ode.unshift(T('오데가 욕조 안에서 수도를 가리켰다. 잠가도 물이 멈추지 않았다. 벽의 배수 밸브를 살폈다.'),puzzle('욕실 배수','안내판: 입수는 잠그고, 배수는 끝까지, 보조관은 절반. ○ 잠금 / ◐ 절반 / ● 완전 개방',['입수','배수','보조관'],[0,2,1],'○ ● ◐'));
SCRIPTS.chair.unshift(T('의자 밑에서 내 가방을 찾았다. 휴대폰에는 내가 찍은 동영상이 남아 있었다.'),T('문이 안 열리면 아래로 내려가. 의자에 버튼 있어.','영상 속 나'),T('촬영 날짜는 오늘이었다. 나는 가방을 찾은 자리와 화면 속 배경을 번갈아 봤다. 같은 곳이었다.'),puzzle('의자 더미 치우기','낮은 의자부터 빼야 한다. 첫 의자는 바닥, 둘째는 가운데, 셋째는 맨 위에 걸려 있다. ○ 바닥 / ◐ 가운데 / ● 위',['첫 의자','둘째 의자','셋째 의자'],[0,1,2],'○ ◐ ●'));
SCRIPTS.fall.push(puzzle('발목의 호스 풀기','왼쪽 고리는 느슨하게, 가운데는 완전히 풀고, 오른쪽 잠금은 유지한다. ○ 잠금 / ◐ 느슨하게 / ● 풀기',['왼쪽','가운데','오른쪽'],[1,2,0],'◐ ● ○'));
SCRIPTS.rewrite.splice(5,0,puzzle('배수 틈 통과','몸을 낮춰 첫 틈을 통과한 뒤 가운데 홈에서 버티고 마지막에는 펴서 올라간다. ○ 낮춤 / ◐ 버팀 / ● 펼침',['첫 틈','가운데 홈','출구'],[0,1,2],'○ ◐ ●'));
SCRIPTS.wake.push(T('휴대폰을 켜자 백룸에서 본 영상이 떠 있었다. 손목에도 테이프가 붙어 있었다.'),T('방에서 깨도 끝난 거 아니야.','영상 속 나'),T('일어나셨습니까?','브리아노'));
SCRIPTS.finalDoor=[J('finalChoice')];
SCRIPTS.finalChoice=[T('문밖에서 기다리는 발소리가 들렸다. 나는 휴대폰을 손에 든 채 침대에 앉아 있었다.'),C('어떻게 할까?', [['휴대폰을 내려놓고 출근 준비를 한다','normalEnd'],['문을 열고 내 몸을 보여 달라고 한다','happyReveal']])];
SCRIPTS.normalEnd=[R('lab',8,8),T('그러고 보니…… 왜 웃었더라? 뭐가 웃겼지?'),T('후두부가 웃는군.','브리아노'),E('normal')];
SCRIPTS.happyReveal=[T('제 몸 보여 주세요. 지금 보고 있는 거 말고요.'),R('lab',8,8),T('유리문 안에 통이 있었다. 선이 여러 가닥 연결되어 있었다. 앞에 붙은 이름표를 읽었다. 내 이름이었다.'),T('나머지는요?'),T('남아 있지 않습니다.','브리아노'),T('나는 다시 통을 봤다. 뭘 더 물어야 할지 몰라 의자를 찾아 앉았다.'),T('문밖에서 김솔음이 안을 들여다봤다. 뒤에는 오데도 있었다. 나는 들어오라고 손짓했다.'),T('설명은 들으셨습니까?','김솔음'),T('아직요.'),T('그가 옆에 의자를 놓고 앉았다. 나는 오데가 들어올 때까지 기다렸다.'),E('happy')];
ENDINGS.happy.text='서류를 펼쳤다. 모르는 말이 많았다. 김솔음에게 첫 줄부터 같이 읽어 달라고 했다. 오데는 의자를 끌고 와 내 옆에 앉았다.';

// Optional companions: physical clues, prior actions and a single irreversible descent.
const REQUIRED_PARTY=['kim','ode','hachi','jubin','changwon','nasol'];
ITEMS.earring=['한쪽 귀걸이','거울 아래에서 주웠다. 작은 고리가 달려 있다.'];
ITEMS.badge=['출입증','기록철 뒷장에 끼워져 있었다. 이름은 김창원.'];
SCRIPTS.mirror.push(F('mirrorSeen'),T('거울 아래쪽에 무언가 반짝였다. 고개를 숙였지만 식탁보에 가려 잘 보이지 않았다.'));
SCRIPTS.mirrorAgain=[T('식탁보 끝을 들자 귀걸이 하나가 떨어졌다. 나는 주워서 주머니에 넣었다.'),I('earring')];
SCRIPTS.recordBack=[T('기록철을 뒤집어 봤다. 뒷장 안쪽에 출입증이 끼워져 있었다. 사진 속 남자는 안경을 쓰고 있었다.'),I('badge')];
MAPS.ward.objects.find(o=>o.id==='record').hide=null;
MAPS.prom.objects.push(O('pianoTune',5,18,'mark','피아노 건반'));
SCRIPTS.pianoTune=[T('악보는 없었다. 덮개 안쪽에 작은 발자국 세 개가 찍혀 있었다. 차례로 건반을 눌렀다.'),F('tunePlayed'),T('어디선가 같은 소리가 한 번 더 들렸다.')];
MAPS.ward.objects.push(O('wardReturn',4,12,'door','홀로 돌아가는 문'));
SCRIPTS.wardReturn=[R('landing',20,6)];
MAPS.landing.objects.push(O('promReturn',4,6,'door','연회장 문'));
SCRIPTS.promReturn=[R('prom',17,3)];
MAPS.loop.objects.push(O('researchDoor',5,11,'door','불 꺼진 연구실'),O('bathReturn',3,5,'door','욕실 쪽 문'));
SCRIPTS.bathReturn=[R('bath',30,9)];
MAPS.bath.objects.push(O('wardBack',4,7,'door','병동 쪽 문'));
SCRIPTS.wardBack=[R('ward',24,12)];
SCRIPTS.researchDoor=[R('research',4,10),T('책상 뒤에 남자가 앉아 있었다. 안경을 고쳐 쓰더니 나를 봤다.')];
MAPS.research={name:'불 꺼진 연구실',theme:'lab',w:24,h:18,mission:'책상 뒤에서 인기척이 난다',objects:[O('changwon',16,8,'changwon','안경을 쓴 남자',{hide:'changwonJoined'}),O('researchReturn',3,12,'door','복도로')],props:[['desk',16,6],['monitor',19,5],['bed',7,5],['plant',20,14]]};
SCRIPTS.researchReturn=[R('loop',6,11)];
SCRIPTS.changwonWait=[T('김창원이라고 합니다. 출입증을 잃어버려서 여기 갇혔습니다.','김창원'),T('문은 열려 있는데요?'),T('제가 나가면 경보가 울립니다.','김창원')];
SCRIPTS.changwonOffer=[T('출입증의 사진과 얼굴을 번갈아 봤다. 남자가 손을 내밀었다.'),T('그거 제 건데요.','김창원'),C('출입증을 어떻게 할까?', [['돌려주고 같이 간다','changwonJoin'],['일단 보관한다','leaveOptional']])];
SCRIPTS.changwonJoin=[{op:'remove',id:'badge'},P('changwon'),F('changwonJoined'),T('그가 문을 넘었다. 경보는 울리지 않았다.')];
MAPS.backroom.objects.push(O('jubin',15,7,'jubin','벽 옆의 남자',{hide:'jubinJoined'}),O('hachiRescue',5,8,'hachi','의자 뒤의 하치와레',{hide:'hachiJoined'}),O('backroomReturn',3,4,'door','벽지 틈'));
SCRIPTS.backroomReturn=[R('loop',17,11)];
SCRIPTS.jubinWait=[T('남자가 한쪽 귀를 만지며 카펫을 살피고 있었다.'),T('뭐 잃어버렸어요?'),T('귀걸이요. 한쪽만 없어서.','이주빈'),T('그는 이주빈이라고 이름을 알려 주고 다시 바닥을 살폈다.')];
SCRIPTS.jubinOffer=[T('주머니에서 귀걸이를 꺼냈다. 남자가 고개를 들었다.'),T('어디서 찾았어요?','이주빈'),C('귀걸이를 어떻게 할까?', [['건네주고 같이 나가자고 한다','jubinJoin'],['나중에 돌려준다','leaveOptional']])];
SCRIPTS.jubinJoin=[{op:'remove',id:'earring'},P('jubin'),F('jubinJoined'),T('이주빈이 귀걸이를 끼웠다. 내가 걸음을 옮기자 뒤따라왔다.')];
SCRIPTS.leaveOptional=[T('나는 물건을 주머니에 넣었다.')];
SCRIPTS.hachiWait=[T('하치와레가 의자 뒤에 숨었다. 가까이 가면 더 안쪽으로 들어갔다. 앞발로 건반을 누르는 시늉을 하고 있었다.')];
SCRIPTS.hachiOffer=[T('연회장의 피아노 소리를 흉내 냈다. 하치와레가 의자 뒤에서 나왔다.'),C('하치와레가 내 발치를 맴돈다.',[['같이 가자고 한다','hachiJoin'],['먼저 길을 살핀다','leaveOptional']])];
SCRIPTS.hachiJoin=[P('hachi'),F('hachiJoined'),T('하치와레가 내 소매를 잡았다.')];
for(const id of ['exitProm','bathExit'])SCRIPTS[id]=SCRIPTS[id].filter(n=>!(n.op==='party'&&!n.join&&['kim','ode'].includes(n.id)));
SCRIPTS.chairWait=[T('버튼 옆에 아래로 향하는 화살표가 그려져 있었다. 돌아올 계단은 보이지 않았다.')];
SCRIPTS.finalDoor=[J('finalChoice')];
SCRIPTS.finalChoice=[T('복도에서 발소리가 들렸다. 나는 문 앞에 서서 뒤를 돌아봤다.'),C('어떻게 할까?', [['휴대폰을 내려놓고 출근 준비를 한다','normalEnd'],['문을 열고 모두 함께 나간다','escapeCheck']])];
SCRIPTS.escapeCheck=[{op:'allParty',yes:'happyReveal',no:'incompleteEscape'}];
SCRIPTS.incompleteEscape=[T('문을 열고 나왔다. 문이 닫힌 뒤에도 한동안 손잡이를 놓지 못했다.'),T('안쪽에서 누군가 의자를 끄는 소리가 났다. 다시 열려고 했지만 손잡이는 돌아가지 않았다.'),E('normal')];
SCRIPTS.happyReveal=[R('lab',8,10),T('관찰실의 문은 안에서 잠겨 있었다. 김창원이 출입증을 대자 잠금이 풀렸다.'),T('이주빈이 문을 잡았다. 오데와 하치와레가 먼저 나갔고 김솔음이 내 옆에서 기다렸다.'),T('통에 붙은 이름표가 눈에 들어왔다. 내 이름이었다.'),T('나머지는요?'),T('남아 있지 않습니다.','브리아노'),T('나는 통을 다시 봤다. 김솔음이 내 팔을 받쳤다.'),T('지금 설명 들으실 겁니까?','김창원'),T('아뇨. 나가서요.'),T('문을 넘기 전에 한 명씩 세었다. 이번에는 아무도 남아 있지 않았다.'),E('happy')];
ENDINGS.happy.title='아무도 두고 오지 않았다';ENDINGS.happy.text='나는 문을 열어 둔 채 기다렸다. 마지막으로 김창원이 나왔다. 다 왔다는 말을 듣고서야 손잡이를 놓았다. 몸이 돌아온 것은 아니었다. 그래도 이번에는 모두 함께 나왔다.';
ENDINGS.happy.hint='닫힌 문 앞에서 함께 기다려 줄 사람들.';
MAPS.prom.mission='연회장을 둘러보고 나갈 방법을 찾자';MAPS.ward.mission='내 물건을 찾자';MAPS.backroom.mission='의자 사이에서 길을 찾자';MAPS.pool.mission='물 밖으로 나갈 방법을 찾자';
// Optional clues remain environmental; failure never prints a solution.


ITEMS.wrench=['작은 렌치','육각형 너트를 돌릴 때 쓰는 공구.'];
MAPS.ward.objects.push(O('toolDrawer',27,16,'desk','책상 서랍',{hide:'toolTaken'}));
SCRIPTS.toolDrawer=[T('서랍에서 작은 렌치를 찾았다.'),I('wrench'),F('toolTaken')];
SCRIPTS.missingKeys=[T('열쇠 뭉치가 없다. 어디에 두고 왔는지 찾아봐야겠다.')];
SCRIPTS.missingPen=[T('글씨를 고치려면 펜이 필요하다.')];
for(const nodes of Object.values(SCRIPTS))for(const n of nodes)if(n.puzzle){
 n.positions=['0 / 없음','1 / 중간','2 / 끝'];n.device='dial';
 if(n.title==='열쇠 맞추기'){n.requires='keys';n.help='열쇠에 홈이 세 개 있다. 왼쪽부터 깊은 홈, 홈 없음, 얕은 홈. 다이얼 눈금 0은 홈 없음, 1은 얕음, 2는 깊음이다.';n.positions=['0 · 홈 없음','1 · 얕은 홈','2 · 깊은 홈']}
 if(n.title==='욕실 배수'){n.requires='wrench';n.device='valve';n.help='배관 안내판: 입수 잠금 / 배수 완전 개방 / 보조관 절반. 밸브는 닫힘 → 절반 → 열림 순서로 돌아간다.';n.positions=['닫힘','절반','열림']}
 if(n.title==='의자 더미 치우기'){n.device='lever';n.help='권양기 옆 그림에 첫 의자는 바닥, 둘째는 가운데, 셋째는 맨 위에 걸려 있다. 레버를 의자 높이에 맞추면 고정 장치가 풀린다.';n.positions=['아래','가운데','위']}
 if(n.title==='발목의 호스 풀기'){n.device='lever';n.help='연결부 각인: 왼쪽은 느슨하게 / 가운데는 완전히 풀기 / 오른쪽은 잠금 유지. 레버 아래부터 잠금, 느슨하게, 풀림이다.';n.positions=['잠금','느슨하게','풀림']}
 if(n.title==='배수 틈 통과'){n.device='lever';n.help='첫 틈은 몸을 낮춰 통과하고 가운데 홈에서 버틴다. 마지막에는 몸을 펴서 올라가야 한다. 아래는 낮춤, 가운데는 버팀, 위는 펼침.';n.positions=['낮춤','버팀','펼침']}
}
// Retrieving a dropped tool remains possible before the pursuit starts.
MAPS.pool.objects.push(O('poolReturn',5,5,'door','위로 이어진 정비 사다리'));
SCRIPTS.poolReturn=[R('backroom',44,24)];

SCRIPTS.penLeft=[T('펜을 내려놓았다. 물 위로 떠올랐다.'),C('배수로 쪽에서 소리가 난다.', [['그대로 간다','chaseIntro'],['아직 여기서 살펴본다','leaveOptional']])];

MAPS.ward.objects.push(O('nasol',4,10,'nasol','관자놀이를 누르는 여자',{hide:'nasolJoined'}),O('quietConsole',5,8,'monitor','병동 제어함'));
SCRIPTS.nasol=[Q('wardQuiet','nasolOffer','nasolWait')];
SCRIPTS.nasolWait=[T('여자가 벽에 기대서 관자놀이를 누르고 있었다. 말을 걸자 눈부터 찌푸렸다.'),T('목소리 좀 낮춰요. 머리 울리니까.','진나솔'),T('어디 아파요?'),T('편두통이요. 저 기계가 계속 울려서.','진나솔'),T('그녀는 제어함을 가리켰다.'),T('모르면 그냥 둬요. 환기까지 꺼 버리지 말고.','진나솔')];
SCRIPTS.quietConsole=[T('덮개가 나사로 고정되어 있었다. 옆에 붙은 회로도를 펼쳤다.'),{puzzle:true,title:'병동 제어함',device:'lever',requires:'wrench',labels:['조명','경보음','환기'],positions:['꺼짐','낮음','정상'],answer:[1,0,2],help:'회로도 옆 메모: 휴식 시간에는 조명을 낮추고 경보음을 끈다. 환기는 정상 운전. 레버는 아래부터 꺼짐, 낮음, 정상이다.'},F('wardQuiet'),T('조명이 낮아지고 기계 소리가 멎었다. 벽 쪽에서 여자가 고개를 들었다.')];
SCRIPTS.nasolOffer=[T('진나솔이 제어함의 눈금을 확인했다.'),T('환기는 살려 놨네요.','진나솔'),T('아까 끄지 말라고 했잖아요.'),T('말해도 못 알아듣는 사람이 많아서요.','진나솔'),C('진나솔이 벽에서 몸을 뗐다.', [['같이 나가자고 한다','nasolJoin'],['먼저 가겠다고 한다','leaveOptional']])];
SCRIPTS.nasolJoin=[P('nasol'),F('nasolJoined'),T('진나솔이 내 뒤로 왔다.'),T('앞장서요. 길 막히면 제가 볼 테니까.','진나솔')];
SCRIPTS.happyReveal.splice(2,0,T('문 앞에서 멈추자 진나솔이 내 어깨를 짚었다.'),T('나가서 봐요. 뒤에 아직 사람 있어요.','진나솔'));

MAPS.ward.mission='가방을 보관한 곳을 찾아보자 · 커튼 뒤에서는 몸을 숨길 수 있다';
SCRIPTS.landingDoor.push(T('침대 사이로 간호사들이 돌아다녔다. 커튼 뒤에서 지나가기를 기다릴 수 있을 것 같다.'));

// Spatial puzzles replace only the device UI; scene prose and outcomes stay intact.
for(const nodes of Object.values(SCRIPTS))for(const n of nodes)if(n.puzzle){
 if(n.title==='의자 더미 치우기'){n.device='chairs';n.help='붉은 의자를 오른쪽 출구까지 밀어 길을 만들자. 의자를 고른 뒤 화살표로 한 칸씩 민다. 긴 의자는 놓인 방향으로만 움직이며 다른 의자를 통과할 수 없다.'}
 if(n.title==='발목의 호스 풀기'){n.device='pipes';n.help='관 조각을 눌러 시계 방향으로 돌린다. 왼쪽 압력관에서 오른쪽 배출구까지 끊김 없이 연결한 뒤 압력을 빼자. 청록색 관은 입구에 연결된 부분이다.'}
}

// An optional altar room branches off the looping corridor.
const STATUE_CLAIMS=[
 {name:'이를 드러낸 머리',text:'진실을 말하는 건 1번 아니면 2번이다.',truth:[0,1]},
 {name:'눈을 감은 머리',text:'진실을 말하는 건 4번 아니면 5번이다.',truth:[3,4]},
 {name:'금이 간 머리',text:'2번은 거짓말을 한다.',truth:[0,2,3,4]},
 {name:'눈을 부릅뜬 머리',text:'진실을 말하는 조각상의 번호는 짝수다.',truth:[1,3]},
 {name:'입을 벌린 머리',text:'진실을 말하는 건 나다.',truth:[4]}
];
const ALTAR_HEADS=[[5,8],[9,8],[13,8],[17,8],[21,8]];
MAPS.loop.objects.push(O('altarDoor',6,11,'door','제단실로 내려가는 문'));
MAPS.altar={name:'거짓말쟁이들의 제단실',theme:'altar',w:28,h:30,mission:'받침대의 비문과 다섯 머리 조각상을 조사하자',objects:[
 O('altarTrial',13,10,'altarTable','받침대의 비문'),O('altarExit',13,27,'door','복도로 돌아가는 출입문'),
 ...ALTAR_HEADS.map(([x,y],i)=>O('altarHead'+i,x,y,'stoneHead'+i,(i+1)+'번 · '+STATUE_CLAIMS[i].name,{hide:'altarAwake'}))
],props:[...ALTAR_HEADS.map(([x,y])=>['altarPlinth',x,y]),['altarPillar',8,14],['altarPillar',18,14],['altarPillar',12,19],['altarPillar',22,22],['altarPillar',5,23],['altarCandle',3,5],['altarCandle',24,5],['altarCandle',3,16],['altarCandle',24,16],['altarCandle',9,26],['altarCandle',17,26]]};
SCRIPTS.altarDoor=[R('altar',13,25)];
SCRIPTS.altarTrial=[{statueTrial:true}];
for(let i=0;i<5;i++)SCRIPTS['altarHead'+i]=[{statueTrial:true,preselect:i}];
SCRIPTS.altarExit=[R('loop',6,10)];
SCRIPTS.altarEmpty=[T('받침대에 돌가루만 남아 있었다.')];
ENDINGS.altar={type:'BAD END 04',title:'여섯 번째 머리',text:'천장에서 돌가루가 떨어졌다.\n문으로 달려가기도 전에 돌판이 내려앉았다.\n\n먼지가 가라앉자 받침대 하나가 더 생겼다.\n그 위에서 내가 입을 열었다.\n“나는 거짓말을 안 해.”',hint:'제단실의 머리 조각상 중 참말을 하는 것은 하나뿐이다.'};

// Stable completion IDs survive UI changes and save/load cycles.
for(const nodes of Object.values(SCRIPTS))for(const n of nodes)if(n.puzzle)n.puzzleId=({
 '열쇠 맞추기':'prom-key','욕실 배수':'bath-drain','의자 더미 치우기':'chair-path',
 '발목의 호스 풀기':'ankle-hose','배수 틈 통과':'drain-passage','병동 제어함':'ward-console'
})[n.title];
SCRIPTS.exitPromOpen=[R('landing',4,6)];
SCRIPTS.wardLeverOpen=[R('bath',4,7)];
SCRIPTS.quietConsoleDone=[T('제어함은 맞춰 둔 눈금을 유지하고 있었다.')];
SCRIPTS.chairCleared=SCRIPTS.chair.filter(n=>n.choice);
MAPS.ward.mission='병동을 둘러보고 나갈 길을 찾자 · 커튼 뒤에서는 몸을 숨길 수 있다';

// Room transfers require an explicit choice, separate from advancing dialogue.
const DOOR_ACTIONS={exitProm:'나가기',landingDoor:'들어가기',wardReturn:'나가기',promReturn:'들어가기',bathExit:'나가기',wardBack:'들어가기',bathReturn:'들어가기',loopWrong:'나가기',researchDoor:'들어가기',researchReturn:'나가기',backroom:'들어가기',backroomReturn:'나가기',poolReturn:'올라가기',wake:'들어가기',altarDoor:'들어가기',altarExit:'나가기'};
SCRIPTS.doorStay=[];
for(const [id,verb] of Object.entries(DOOR_ACTIONS)){
 const object=Object.values(MAPS).flatMap(m=>m.objects).find(o=>o.id===id);
 SCRIPTS['doorAsk_'+id]=[{choice:object.label,doorConfirm:true,options:[{text:verb,to:'doorGo_'+id},{text:'머무르기',to:'doorStay'}]}];
 SCRIPTS['doorGo_'+id]=[{op:'enterDoor',id}];
}
