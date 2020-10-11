
/**
$all_styles = [
"css/main.css",
"css/animate.css",
"css/ng-wig.css",
];

$output = 'styles.css';
$nms = 0;
// Open the file to get existing content
$current = "\n"."/*START OF CSS*/"."\n";;
for ($i=0; $i < count($all_styles) ; $i++) {
$file = $baseUrl.$all_styles[$i];
// Open the file to get existing content
$current .= file_get_contents($file); 
// Append a new person to the file
$current .= "\n"."/*JOINING NEW FILE HERE*/\n";
// Write the contents back to the file
$nms++;
}//for
file_put_contents($output, $current);

**/