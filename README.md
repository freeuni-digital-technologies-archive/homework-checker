# Homework Checker

## გარემოს გამართვა
### პრერეკვიზიტები
- node >= 12
- yarn
- hub (github-ის cli)
- windows-ის შემთხვევაში: git და git bash

### აუცილებელი ნაბიჯები
1. კლონირება
2. კლონირების შემდეგ გახსენი დირექტორია bash-ში და გაუშვი ბრძანება
```shell
yarn
```
3. credentials ფაილების გამართვა
    - შექმენი `data/credentials` დირექტორია (იმ დირექტორიაში, სადაც დააკლონირე. ანუ homework-checker სადაც არის)
    - გადაიტანე ფაილები token.json და credentials.json
4. subject.json ფაილის შექმნა
    - data დირექტორიაში უნდა შეიქმნას subject.json
    - subject.json ფაილში უნდა ჩაიწეროს (22 მაგივრად შესაბამისი წელი):
    ```shell
    {
      "subject" : "22s შესავალი ციფრულ ტექნოლოგიებში"
    }
    ```
5. ssh გამართვა

<!-- TODO add instructions -->

## Development Workflow
### issues, branches, pull requests
- ახალი issue-ს სახელი github-ზე იწყება აქედან ერთ-ერთით:
  - `FEATURE|BUGFIX|IMPROVEMENT|HOTFIX|QA`
- შექმნის შემდეგ github issue-ს გვერდზე მარჯვნივ `Development` სექციაში დააჭირე `create new branch`, დააკოპირე სათაური
- ლოკალურად გაუშვი
```shell
git pull
git checkout --track origin/<დაკოპირებული სახელი>
```
- როცა პროგრესი მზად არის გადასახედად, ვხსნით pull request-ს
```shell
hub pull-request -i <issue number>
```
- pull request-ს ვმერჯავთ squash commit-ით


## module list
* classroom-api - გუგლის კლასრუმის ჯავასკრიპის ბიბლიოთეკაზე დაშენებული ლეიერი შედარებით მარტივად გამოსაყენებელი ფუნქციებით.
	* ასევე შეიცავს მეილის დაგზავნის და დრაივის გადამოწერს ფუნქციონალს
	* ხელმისაწვდომია როგორც standalone cli აპლიკაციაც - თუ გუგლ კლასრუმს იყენებს ლექტორი და სურს რომელიმე დავალების ფაილები მარტივად გადმოიწეროს/unzip გააკეთოს და ა.შ, ერთი ბრძანებით არის შესაძლებელი
* jskarel - `tested` კარელის პროგრამების სიმულაციის/გაშვების ბიბლიოთეკა.
* codehskarel-tester - აქვს ერთადერთი public ფუნქცია testSubmission რომელიც იღებს კარელის პროგამის ფაილს(რომელიც სტუდენტებმა ატვირთეს) და ტესტ ფაილს. უშვებს ამ ტესტს და აბრუნებს შედეგს (რომელი ტესტები გაიარა). გამოყენების მაგალითები `test/`-ში არის.
* website-tester - იდეურად იგივე რაც codehskarel-tester ოღონდ ჯს-ის დავალებებისთვის (ტექნიკურად შედარებით რთული). wiki-ზე წერია ამ ორ მოდულზე მეტი აღწერა.
* module-karel - ეს მოდული კრავს რეალურად ყველაფერს. იწერს ყველა სტუდენტის ამოხსნებს, უშვებს ყველას codehskarel-tester-ით resources/-ში არსებული ტესტებით და საბოლოოდ შედეგებს ინახავს `src/runs.ts`-ით.(data ფოლდერში შეინახავს რომლის დაკონფიგურირება ბოლოსკენ წერია.) 2021 წლის შემოდგომიდან შეიცავს არა მარტო კარელის, არამედ ჯენერიკ მოდულებს მაგრამ ჯერ სახელი არ შემიცვლია.
* dt-homeworks - დავალებების კონფიგურაციები
* dt-utils - რამდენიმე ფუნქცია რომელიც არ ვიცით სად სჯობს იყოს
