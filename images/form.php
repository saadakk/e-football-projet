<html>
<head>
	<title>PHP Test</title>
	<style>
		fieldset{
			width:50%;
		}
		table{
			margin: 50px;
		}
		
		td{
			margin: 100px;
		}
		tr{
			margin: 500px;
		}
	</style>
</head>
<body>
		<fieldset>
			<legend> Vos données personnelles </legend>
			<form action="" method="post">
				<table border="1" rules="none" width="80%">
					<tr>
						<td colspan="3"><label for="Nom">Nom : </label></td>
						<td colspan="3"><input  type="text" name="Nom" id="Nom" placeholder="Votre nom" ></td>
					</tr>
					<tr>
						<td colspan="3"><label for="PreNom">Prénom : </label></td>
						<td colspan="3"><input  type="text" name="PreNom" id="PreNom" placeholder="Votre prénom"></td>
					</tr>
					<tr>
						<td colspan="3"><label for="DateNaissance">Date de naissance : </label></td>
						<td colspan="3"><input  type="date" name="DateNaissance" id="DateNaissance"></td>
					</tr>					<tr>
						<td colspan="4">
							<fieldset>
								<legend> Lieu de Naissance</legend>
								<input  type="radio"  name="LieuDeNaissance" id="Lieu1" value="Siene"><label for="Lieu1"> Seine-Saint-Denis</label>
								<input  type="radio"  name="LieuDeNaissance" id="Lieu2" value="reste"><label for="Lieu2"> Reste du monde</label>
							</fieldset>
						</td>
					</tr>
					<tr>
						<td colspan="3"><label for="AdressePostal">Adresse Postal : </label></td>
						<td colspan="3"><textarea type="text"  name="AdressePostal" id="AdressePostal"cols="30"rows="5" placeholder="Votre adresse"></textarea></td>
					</tr>
					<tr>
						<td colspan="3"><label for="CodePostal">Code postal : </label></td>
						<td colspan="3"><input  type="number"  name="CodePostal" id="CodePostal" placeholder="93000"></td>
					</tr>
					<tr>
						<td colspan="3"><label for="AdresseElectr">Adresse électronique : </label></td>
						<td colspan="3"><input  type="text"  name="AdresseElectr" id="AdresseElectr" placeholder="vorte adresse électronique"></td>
					</tr>
					<tr>
						<td colspan="3"><label for="PagePerso">Page personnelle : </label></td>
						<td colspan="3"><input  type="text"  name="PagePerso" id="PagePerso" placeholder="votre page web"></td>
					</tr>
					<tr>
						<td colspan="3"><label for="Phone">Téléphone portable : </label></td>
						<td colspan="3"><input  type="tel"  name="Phone" id="Phone" placeholder="0601234567"></td>
					</tr>
					<tr>
						<td colspan="3"><label for="Semestre">Semestre : </label></td>
						<td colspan="3">
							<select name="Semestre" id="Semestre">
								<option>S1</option>
								<option>S2</option>
								<option>S3</option>
							</select>
						</td>
					</tr>
					<tr>
						<td colspan="3"><label for="NiveauHTML">Niveau en HTML : </label></td>
						<td colspan="3"><input  type="range" name="NiveauHTML" id="NiveauHTML" value="0"></td>
					</tr>
					<tr>
						<td colspan="4">
							<fieldset>
								<input type="checkbox"  name="HTML" id="HTML"><label for="HTML"> HTML </label>
								<input type="checkbox"  name="CSS" id="CSS"><label for="CSS"> CSS </label>
								<input type="checkbox"  name="Formulaires" id="Formulaires"><label for="Formulaires"> formulaires </label>
								<input type="checkbox"  name="JS" id="JS"><label for="JS"> JavaScript </label>
							</fieldset>
						</td>
					</tr>
					<tr>
						<td><button type="submit"  name="sard" id="Sard" value='sard'>Submit</button>
						</td>
						<td><button type="reset"  name="3awd" id="3awd">Reset</button>
						</td>
						<td><button type="button"  name="Bdl" id="Bdl">Edit</button>
						</td>
						<td><button type="button"  name="Bdl" id="Bdl">Edit</button>
						</td>
					</tr>
		<?php
		
		$formcomplete=true;
		$regxNomPrenom = "/[0-9]|[\`\~\!\@\#\$\%\^\&\*\(\)\_\-\+\=\\\}\{\[\]\;\'\:\"\>\<\?\/\.\,]/i";
		$regxAdresse = "/[\`\~\!\@\#\$\%\^\&\*\(\)\_\+\=\\\}\{\[\]\;\'\:\"\>\<\?\/\.\|]|(,,)+|(--)+/i";
		$regxPosta = "/^([0-9]+)$/i";
		$regxEmail = "/^(([a-z]+[-_.+]?([0-9]+)?)+@[a-z]+.[a-z]+)$/i";
		$regxUrl = '/^(http|https|ftp):\/\/www.([a-z]+(\d+)?)+\.[a-z]+(\/[a-z]+(\d+)?([$&|._=+]+)?)+/i';
		$regxTel = '/^((\+)?[0-9]+|\+\([0-9]+\))?([0-9]+(\-)?)+$/i';
        if (isset($_POST['Nom']) and !preg_match($regxNomPrenom,$_POST['Nom'])){
            $nom=$_POST['Nom'];
        }
		else{
			$formcomplete=false;
		}
        if (isset($_POST['PreNom']) and !preg_match($regxNomPrenom,$_POST['PreNom'])){
            $prenom=$_POST['PreNom'];
        }
		else{
			$formcomplete=false;
		}
        if (isset($_POST['JS'])){
            $JS=$_POST['JS'];
        }
        else{
            $JS="off";
        }
        if (isset($_POST['Formulaires'])){
            $formulaires=$_POST['Formulaires'];
        }
        else{
            $formulaires="off";
        }
        if (isset($_POST['CSS'])){
            $CSS=$_POST['CSS'];
        }
        else{
            $CSS="off";
        }
        if (isset($_POST['HTML'])){
            $HTML=$_POST['HTML'];
        }
        else{
            $HTML="off";
        }
        if (isset($_POST['NiveauHTML'])){
            $niveauhtml=$_POST['NiveauHTML'];
        }
		else{
			$formcomplete=false;
		}
        if (isset($_POST['Phone']) and preg_match($regxTel,$_POST['Phone']) ){
            $phone=$_POST['Phone'];
        }
		else{
			$formcomplete=false;
		}
        if (isset($_POST['PagePerso'])){
            $pageperso=$_POST['PagePerso'];
        }
		else{
			$formcomplete=false;
		}
        if (isset($_POST['AdresseElectr'])){
            $adresselec=$_POST['AdresseElectr'];
        }
		else{
			$formcomplete=false;
		}
        if (isset($_POST['CodePostal'])){
            $codepostal=$_POST['CodePostal'];
        }
		else{
			$formcomplete=false;
		}
        if (isset($_POST['AdressePostal'])){
            $adressepostal=$_POST['AdressePostal'];
        }
		else{
			$formcomplete=false;
		}
        if (isset($_POST['LieuDeNaissance'])){
            $lieudenaissance=$_POST['LieuDeNaissance'];
        }
		else{
			$formcomplete=false;
		}
        if (isset($_POST['DateNaissance'])){
            $datenaissance=$_POST['DateNaissance'];
        }
		else{
			$formcomplete=false;
		}
		if (isset($_POST['Semestre'])){
            $Semestre=$_POST['Semestre'];
		}
		if(isset($_POST['row'])){
			$row_index = $_POST['row']-1;
			$row_index=str_replace(".","",$row_index);
			settype($row_index,"integer");
			$file=file_get_contents('info.txt');
			$text=explode("\n",$file);
			unset($text[$row_index]);
			$newtext=implode("\n",$text);
			$newfile = fopen("info.txt", "w") or die("Unable to open file!");
			fwrite($newfile, $newtext);
            fclose($newfile);
			echotable();
		  }

		if ($formcomplete==true and isset($_POST['sard'])){
        $myfile = fopen("info.txt", "a") or die("Unable to open file!");
        $adressepostal = removeEmptyLines($adressepostal);
        $txt = $nom.":".$prenom.":".$JS.":".$formulaires.":".$CSS.":".$HTML.":".$niveauhtml.":".$phone.":".$pageperso.":".$adresselec.":".$codepostal.":".$adressepostal.":".$lieudenaissance.":".$datenaissance.":".$Semestre."\n";
		$txtname = $nom.$prenom;
        if ($file = fopen("info.txt", "r")) {
            $write=true;
            while(!feof($file)) {
                $line = fgets($file);
				$linesplit= explode(':',$line);
				$nameuser = @$linesplit[0].@$linesplit[1];
                if ($nameuser==$txtname){
                    echo '<script>alert("User already exists")</script>';
                    $write=false;
                    break;
                };
            };
            if ($write)fwrite($myfile, $txt);
            fclose($file);
        }
		echotable();
	}elseif(isset($_POST['sard'])){
		echo '<script>alert("incomplete !")</script>';
	}
        function removeEmptyLines($s) {
            return preg_replace('!\s+!', ' ', $s);
            }
        function return1if1($number){
            if ($number==1 or $number==0)return 0;
            else return $number;
        }
		function echotable(){
        if ($file = fopen("info.txt", "r",FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES)) {
			echo "<table border='1px'><tr>
			<td>nom</td>
			<td>prenom</td>
			<td>JavaScript</td>
			<td>formulaires</td>
			<td>CSS</td>
			<td>HTML</td>
			<td>niveau HTML</td>
			<td>phone</td>
			<td>page</td>
			<td>adress electronique</td>
			<td>adress postal</td>
			<td>code postal</td>
			<td>lieu de naissance</td>
			<td>date de naissance</td>
			<td>semestre</td>
			<tr>";
            $numlines=count(file('info.txt'));
            $point=0;
            while($point<$numlines) {
                $line = fgets($file);
                $infos = explode(":",$line);
                echo"<tr>";
                for ($i=0; $i <count($infos); $i++) { 
                    echo "<td>".$infos[$i]."</td>";
                }
                echo"<td><form method='post'>
				<button type='submit' name='row' value='$point'>Delete</button>
				</form></td><td><form method='post' action='formedit.php'>
				<button input type='submit' name='edit' value='$point'>Edit</button>
				</form></td></tr>";
                $point++;
            }
            fclose($file);
        };
        echo "</table>";
		}
		?>
			</form>
		</fieldset>
  </body>
</html>